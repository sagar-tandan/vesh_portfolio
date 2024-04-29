import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import location from "../assets/Images/location.png";
import phone from "../assets/Images/phone.png";
import mail from "../assets/Images/mail.png";
import insta from "../assets/Images/insta.png";
import fb from "../assets/Images/fb.png";
import twitter from "../assets/Images/twitter.png";
import linkeedin from "../assets/Images/linkeedin.png";
import youtube from "../assets/Images/youtube.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

import emailjs from "@emailjs/browser";

export default function () {
  useEffect(() => emailjs.init("ks5S-Y-C7FpuISNxj"), []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and reloading the page
    try {
      const serviceId = "service_033psmj";
      const templateId = "template_tqcsqip";

      // console.log(formData);
      if (emailRegex.test(formData.email)) {
        // Add a new document with a generated id.
        // await addDoc(collection(db, "Contacts"), {
        //   name: formData.name,
        //   email: formData.email,
        //   message: formData.message,
        // });
        let toast_id = toast.loading("Please wait...", {
          position: "bottom-center",
        });
        await emailjs.send(serviceId, templateId, {
          name: formData.name,
          sender: formData.email,
          message: formData.message,
        });

        toast.update(toast_id, {
          render: "Message sent successfully!",
          type: "success",
          position: "bottom-center",
          isLoading: false,
          autoClose: 2000,
        });

        // Reset form fields after successful submission
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      // console.error("Error adding document: ", error);

      toast.update(toast_id, {
        render: "Message not sent!",
        type: "error",
        position: "bottom-center",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // const textRef = useRef(null);

  // const copyTextToClipboard = (text) => {
  //   navigator.clipboard.writeText(text).then(
  //     () => {
  //       toast.success("Copied to clipboard!", {
  //         position: "bottom-center",
  //         autoClose: 3000,
  //       });
  //     },
  //     (err) => {
  //       toast.success("Unable to copy text!", {
  //         position: "bottom-center",
  //         autoClose: 3000,
  //       });
  //     }
  //   );
  // };

  const makeCall = (phoneNumber) => {
    // Function to make a call
    window.location.href = `tel:${phoneNumber}`;
  };

  const sendEmail = (emailAddress) => {
    // Function to open email client with pre-filled information
    window.location.href = `mailto:${emailAddress}`;
  };

  const openInMaps = (location) => {
    // Function to open location in Google Maps
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`,
      "_blank"
    );
  };

  return (
    <div className="container mx-auto flex flex-col gap-2 my-8 mt-12">
      <h1 className="font-bold font-SagarFont px-3 text-lg 2xl:text-2xl ">
        Contact
      </h1>

      <div className=" container flex flex-col mx-auto gap-2 md:flex-row mt-4">
        <form onSubmit={handleSubmit} action="" className="mx-5 md:w-1/2">
          <div className="mb-3 pt-0">
            <input
              type="text"
              placeholder="Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>

          <div className="mb-3 pt-0 ">
            <input
              type="email"
              placeholder="Email *"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full"
              required
            />
          </div>

          <div className="mb-3 pt-0">
            <textarea
              placeholder="Your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="p-3 placeholder-white text-white font-SagarFont font-medium bg-slate-400 rounded text-sm shadow-md outline-none focus:outline-none focus:ring w-full h-44"
            />
          </div>

          <button
            type="submit"
            className="mb-2 w-[70%] md:w-1/2 mx-auto bg-slate-500 text-white active:bg-slate-700 font-SagarFont uppercase text-sm rounded shadow-md hover:bg-slate-600 outline-none focus:outline-none p-3 ease-linear transition-all duration-150 "
          >
            Send a Message
          </button>
        </form>

        <div className="flex flex-col mx-3 justify-center md:w-1/2 shadow-md p-3 mb-2">
          <h1 className="font-semibold font-SagarFont text-lg 2xl:text-2xl">
            Request a Call Back
          </h1>
          <p>Got questions? Let's chat!</p>
          <div className="flex gap-3 items-center mt-2 ">
            <img
              src={phone}
              alt="phone png"
              className="w-10 h-10 border-black border-2 rounded-full p-2 hover:scale-105 hover:cursor-pointer ease-linear transition-all duration-150 
              hover:border-none hover:bg-green-500 "
              onClick={() => {
                makeCall("9864425175");
              }}
            />
            <h3
              className="hover:cursor-pointer"
              onClick={() => {
                makeCall("9864425175");
              }}
            >
              9864425175
            </h3>
          </div>

          <div className="flex gap-3 items-center mt-2 ">
            <img
              src={mail}
              alt="email png"
              className="w-10 h-10 border-black border-2 rounded-full p-2 hover:scale-105 hover:cursor-pointer ease-linear transition-all duration-150 
              hover:border-none hover:bg-yellow-500 "
              onClick={() => {
                sendEmail("veshrajpangeni99@gmail.com");
              }}
            />
            <h3
              className="hover:cursor-pointer"
              onClick={() => {
                sendEmail("veshrajpangeni99@gmail.com");
              }}
            >
              veshrajpangeni99@gmail.com
            </h3>
          </div>

          <div className="flex gap-3 items-center mt-2 ">
            <img
              src={location}
              alt="location png"
              className="w-10 h-10 border-black border-2 rounded-full p-2 hover:scale-105 hover:cursor-pointer ease-linear transition-all duration-150 
              hover:border-none hover:bg-red-500 "
              onClick={() => {
                const location = "Ratnachowk Pokhara, Nepal"; 
                openInMaps(location);
              }}
            />
            <h3
              className="hover:cursor-pointer"
              onClick={() => {
                const location = "Ratnachowk Pokhara, Nepal"; 
                openInMaps(location);
              }}
              F
            >
              Pokhara,Nepal
            </h3>
          </div>

          <div className="my-2 border border-solid border-black h-0.2"></div>

          <div className="flex gap-4 items-center justify-center mb-3">
            <div
              class="w-10 h-10 border-2 border-solid border-black rounded-full flex items-center justify-center active:bg-slate-400 hover:scale-110 hover:cursor-pointer ease-linear transition-all duration-150 
            hover:border-none hover:bg-blue-800 "
            >
              <a
                href="https://www.facebook.com/veshraj.veshraj.1"
                target="_blank"
                rel="noreferrer "
              >
                <img
                  src={fb}
                  alt="fb png"
                  className="w-9 h-9 p-2 transition duration-300 ease-in-out hover:filter hover:invert hover:brightness-100 hover:saturate-0 hover:sepia-100 hover:hue-rotate-180"
                />
              </a>
            </div>
            <div
              class="w-10 h-10 border-2 border-solid border-black rounded-full flex items-center justify-center active:bg-slate-400 hover:scale-110 hover:cursor-pointer ease-linear transition-all duration-150 
            hover:border-none hover:bg-blue-600"
            >
              <a
                href="https://twitter.com/pangeni_veshraj"
                target="_blank"
                rel="noreferrer "
              >
                <img
                  src={twitter}
                  alt="twitter png"
                  className="w-9 h-9 p-2 transition duration-300 ease-in-out hover:filter hover:invert hover:brightness-100 hover:saturate-0 hover:sepia-100 hover:hue-rotate-180"
                />
              </a>
            </div>
            <div
              class="w-10 h-10 border-2 border-solid border-black rounded-full flex items-center justify-center active:bg-slate-400 hover:scale-110 hover:cursor-pointer ease-linear transition-all duration-150 
            hover:border-none hover:bg-blue-900"
            >
              <a
                href="https://np.linkedin.com/in/veshraj-pangeni/"
                target="_blank"
                rel="noreferrer "
              >
                <img
                  src={linkeedin}
                  alt="linkedin png"
                  className="w-9 h-9 p-2 transition duration-300 ease-in-out hover:filter hover:invert hover:brightness-100 hover:saturate-0 hover:sepia-100 hover:hue-rotate-180"
                />
              </a>
            </div>

            <div
              class="w-10 h-10 border-2 border-solid border-black rounded-full flex items-center justify-center active:bg-slate-400 hover:scale-110 hover:cursor-pointer ease-linear transition-all duration-150 
            hover:bg-gradient-to-r from-purple-600 to-orange-600 hover:from-orange-600 hover:to-purple-600 hover:border-none"
            >
              <a
                href="https://www.instagram.com/vsshraj_pangeni/"
                target="_blank"
                rel="noreferrer "
              >
                <img
                  src={insta}
                  alt="insta png"
                  className="w-9 h-9 p-2 transition duration-300 ease-in-out hover:filter hover:invert hover:brightness-100 hover:saturate-0 hover:sepia-100 hover:hue-rotate-180"
                />
              </a>
            </div>
            <div
              class="w-10 h-10 border-2 border-solid border-black rounded-full flex items-center justify-center active:bg-slate-400 hover:scale-110 hover:cursor-pointer ease-linear transition-all duration-150 
              hover:border-none hover:bg-red-600"
            >
              <a
                href="https://www.youtube.com/@VeshrajPangeni"
                target="_blank"
                rel="noreferrer "
              >
                <img
                  src={youtube}
                  alt="youtube"
                  className="w-9 h-9 p-2 transition duration-300 ease-in-out hover:filter hover:invert hover:brightness-100 hover:saturate-0 hover:sepia-100 hover:hue-rotate-180"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
