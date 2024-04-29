import React from "react";
import fb from "../assets/Images/fb.png";
import insta from "../assets/Images/insta.png";

const AboutDeveloper = () => {
  return (
    <div className="flex flex-col">
      <a
        href="https://www.facebook.com/sagartandan333"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="container w-1/2 h-10 border-2 border-solid border-black rounded-sm flex items-center justify-center active:bg-slate-400 hover:scale-105 hover:cursor-pointer ease-linear transition-all duration-150 
            hover:border-none hover:bg-blue-800 mt-36 mx-auto "
        >
          <img
            src={fb}
            alt=""
            className="w-9 h-9 p-2 transition duration-300 ease-in-out hover:filter hover:invert hover:brightness-100 hover:saturate-0 hover:sepia-100 hover:hue-rotate-180"
          />
        </div>
      </a>

      <a
        href="https://www.instagram.com/sagartandan_/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="container w-1/2 h-10 border-2 border-solid border-black rounded-sm flex items-center justify-center active:bg-slate-400 hover:scale-105 hover:cursor-pointer ease-linear transition-all duration-150 
                        hover:bg-gradient-to-r from-purple-600 to-orange-600 hover:from-orange-600 hover:to-purple-600 hover:border-none
                        mt-2 mx-auto "
        >
          <img
            src={insta}
            alt=""
            className="w-9 h-9 p-2 transition duration-300 ease-in-out hover:filter hover:invert hover:brightness-100 hover:saturate-0 hover:sepia-100 hover:hue-rotate-180"
          />
        </div>
      </a>
    </div>
  );
};

export default AboutDeveloper;
