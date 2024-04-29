import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase-config.jsx";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";

//Function to Upload images and Pdf files
async function UploadFiles(file) {
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Progress:", progress);
      },
      (error) => {
        reject(error); // Reject promise with error
      },
      async () => {
        // When upload is completed
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);

          // Resolve promise with downloadURL
        } catch (error) {
          reject(error); // Reject promise with error if getting downloadURL fails
        }
      }
    );
  });
}

export default function UploadProjects({ user }) {
  const userId = user?.uid;
  let toast_id;

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    author: "",
    ref: "",
    pdf: "",
  });

  //handle onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.desc.length > 200) {
      const image = e.target.querySelector('input[id="Image"]').files[0];

      if (!image) return;
      try {
        toast_id = toast.loading("Please wait...");
        const downloadURLImg = await UploadFiles(image);
        console.log("Image URL:", downloadURLImg);

        //Once the image and pdf is Uploaded then adding them in Firestore!!
        await addDoc(collection(db, "Projects"), {
          title: formData.title,
          desc: formData.desc,
          author: formData.author,
          image: downloadURLImg,
          pdf: formData.pdf,
          date: Timestamp.fromDate(new Date()),
          ref: formData.ref,
        });

        toast.update(toast_id, {
          render: "La vayo Vesay Vai!!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } catch (error) {
        console.log(error);
        toast.update(toast_id, {
          render: "Vayena sathi !!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Description should contain 200 letters!!", {
        position: "bottom-center",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="container mx-auto flex flex-col gap-4 mt-10 ">
      <div className="flex justify-between mx-9">
        <span></span>
        <span className="font-SagarFont font-semibold text-lg">
          Upload Projects
        </span>
        <Link to = "/admin/uploadprojects/displayprojects">

        
        <span className="font-SagarFont font-normal text-lg border rounded-3xl border-slate-600 flex items-center hover:bg-slate-600 hover:text-white hover:cursor-pointer active:bg-slate-800 ease-linear transition-all duration-150 px-4">
          View all
        </span>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-9">
        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Title of Project</h1>
          <input
            type="text"
            placeholder="Title "
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Description</h1>
          <textarea
            placeholder="description atleast 200 letters.."
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Name of author</h1>
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Ref(Total projects+1)</h1>
          <input
            type="text"
            placeholder="Reference no."
            name="ref"
            value={formData.ref}
            onChange={handleChange}
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Upload the thumbnail (16x9 (recommended))</h1>
          <input
            type="file"
            id="Image"
            required
            accept="image/*"
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Link of pdf file of project</h1>
          <input
            type="text"
            placeholder="drive link of Pdf..."
            name="pdf"
            value={formData.pdf}
            onChange={handleChange}
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="mb-2 w-1/2 mx-auto bg-slate-500 text-white active:bg-slate-700 font-SagarFont uppercase font-semibold rounded shadow-md hover:bg-slate-600 outline-none focus:outline-none p-3 ease-linear transition-all duration-150 "
        >
          Upload Project
        </button>
      </form>
    </div>
  );
}
