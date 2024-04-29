import React, { useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../../firebase-config.jsx";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref as dbRef, getDatabase, push } from "firebase/database";
import {Link} from 'react-router-dom';

async function writeUserData(folderName, imgUrl) {
  const db = getDatabase();
  push(dbRef(db, "Gallery/" + folderName), {
    image: imgUrl,
  });
}

//Function to Upload images and Pdf files
async function UploadFiles(folder, file) {
  const storageRef = ref(storage, `Gallery/${folder}/${file.name}`);
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
          // Reject promise with error if getting downloadURL fails
          reject(error);
        }
      }
    );
  });
}

export default function UploadPhotos() {
  let toast_id;

  const [formData, setFormData] = useState({
    folder: "",
  });

  //handle onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = e.target.querySelector('input[id="Image"]').files[0];

    if (!image) return;
    try {
      toast_id = toast.loading("Please wait...");
      const downloadURLImg = await UploadFiles(formData.folder, image);
      console.log("Image URL:", downloadURLImg);

      await writeUserData(formData.folder, downloadURLImg);

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
      <div className="flex justify-start mx-9">
        <span></span>
        <span className="font-SagarFont font-semibold text-lg">
          Upload Photos
        </span>
        {/* <span className="font-SagarFont font-normal text-lg border rounded-3xl border-slate-600 flex items-center hover:bg-slate-600 hover:text-white hover:cursor-pointer active:bg-slate-800 ease-linear transition-all duration-150 px-4">
              View all
            </span> */}

      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-9">
        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Folder Name</h1>
          <input
            type="text"
            placeholder="Name of folder "
            name="folder"
            value={formData.folder}
            onChange={handleChange}
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-1 font-SagarFont font-semibold">
          <h1>Upload the image </h1>
          <input
            type="file"
            id="Image"
            required
            accept="image/*"
            className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
          />
        </div>

        <button
          type="submit"
          className="mb-2 w-1/2 mx-auto bg-slate-500 text-white active:bg-slate-700 font-SagarFont uppercase font-semibold rounded shadow-md hover:bg-slate-600 outline-none focus:outline-none p-3 ease-linear transition-all duration-150 "
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}
