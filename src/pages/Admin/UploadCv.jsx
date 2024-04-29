import React, { useState } from "react";
import { db } from "../../firebase-config.jsx";
import { collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function UploadCv() {
  const [cv, setCV] = useState(""); // State to hold the CV valu

  const ReplaceCv = async (e) => {
    e.preventDefault();
    try {
      let toast_id = toast.loading("Please wait...");
      await setDoc(doc(db, "CV", "veshraj"), { cv }); // Update Firestore with the new CV
      toast.update(toast_id, {
        render: "CV replaced!!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
        toast.update(toast_id, {
            render: "Something went wrong !!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
    }
  };
  return (
    <div className="container mx-auto flex flex-col gap-4 mt-10 ">
      <div className="flex flex-col gap-1 font-SagarFont font-semibold">
        <h1>Drive Link</h1>
        <input
          type="text"
          placeholder="Paste drive link here...."
          name="cv"
          // value="cv"
          onChange={(e) => {
            setCV(e.target.value);
          }}
          className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>

      <button
        onClick={ReplaceCv}
        type="submit"
        className="mb-2 w-1/2 mx-auto bg-slate-500 text-white active:bg-slate-700 font-SagarFont uppercase font-semibold rounded shadow-md hover:bg-slate-600 outline-none focus:outline-none p-3 ease-linear transition-all duration-150 "
      >
        Replace CV
      </button>
    </div>
  );
}
