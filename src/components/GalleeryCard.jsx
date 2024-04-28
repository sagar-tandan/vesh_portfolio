import React from "react";

export default function ({ folderName,firstImage,className }) {
  return (
      <div className={`m-1 relative overflow-hidden group  hover:scale-105 text-black active:brightness-[25%] active:scale-100 hover:text-white ease-linear transition-all duration-150 ${className}`}>
        <img
          className="w-full h-[220px]  lg:h-[300px] xl:h-[340px] rounded-xl group-hover:brightness-[40%]"
          src={firstImage}
          alt=""
        />
        <div className="absolute invisible group-hover:visible group-hover: bottom-2 left-8 p-4 w-1/2 ">
          <p className="font-bold font-SagarFont z-10">{folderName}</p>
          <p className="font-SagarFont font-sm">Everyday's an adventure when you're a civil engineer!</p>
        </div>
      </div>
  );
}
