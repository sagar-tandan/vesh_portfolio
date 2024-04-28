import React, { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase-config.jsx";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

//Function to Upload images and Pdf files
async function UploadFiles(file) {
  const storageRef = ref(storage, `Blog Images/${file.name}`);
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

export default function UploadBlog() {
  let toast_id;

  const [formData, setFormData] = useState({
    title: "",
    intro: "",
    content: "",
    conclusion: "",
    ref: "",
  });

  //handle onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = e.target.querySelector('input[id="Image1"]').files[0];
    if (!image) return;
    try {
      toast_id = toast.loading("Please wait...");
      const downloadURLImg = await UploadFiles(image);
      console.log("Image1 URL:", downloadURLImg);

      //Once the image and pdf is Uploaded then adding them in Firestore!!
      await addDoc(collection(db, "Blogs"), {
        title: formData.title,
        intro: formData.intro,
        content: formData.content,
        conclusion: formData.conclusion,
        mainImage: downloadURLImg,
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
  };

  return (
    <div className="container mx-auto flex flex-col gap-4 mt-10 ">
      <div className="flex justify-between mx-9">
        <span></span>
        <span className="font-SagarFont font-semibold text-lg">
          Upload Blogs
        </span>
        <Link to = "/admin/uploadblogs/displayblogs">

       
        <span className="font-SagarFont font-normal text-lg border rounded-3xl border-slate-600 flex items-center hover:bg-slate-600 hover:text-white hover:cursor-pointer active:bg-slate-800 ease-linear transition-all duration-150 px-4">
          View all
        </span>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-9">
        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Ref(Total blogs +1)</h1>
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
          <h1>Title of Blog</h1>
          <input
            type="text"
            placeholder="Title *"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Landscape Image</h1>
          <input
            type="file"
            id="Image1"
            required
            accept="image/*"
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Introduction</h1>
          <textarea
            placeholder="Should be engaging and able to grab user attention *"
            name="intro"
            value={formData.intro}
            onChange={handleChange}
            className="p-3 w-full h-36 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring"
            required
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Main Content</h1>
          <textarea
            type="text"
            placeholder="Main Content *"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="p-3 h-48 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>



        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Conclusion</h1>
          <input
            type="text"
            placeholder="Conclusion"
            name="conclusion"
            value={formData.conclusion}
            onChange={handleChange}
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="mb-2 w-1/2 mx-auto bg-slate-500 text-white active:bg-slate-700 font-SagarFont uppercase font-semibold rounded shadow-md hover:bg-slate-600 outline-none focus:outline-none p-3 ease-linear transition-all duration-150 "
        >
          Upload blog
        </button>
      </form>
    </div>
  );
}
