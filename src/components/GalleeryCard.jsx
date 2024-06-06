import React from "react";

export default function ({ folderName,firstImage,count, className }) {
  const title = folderName.length > 25 ? folderName.substr(0, 25) + "..." : folderName;

  return (
      <div className={`m-1 rounded-md relative bg-slate-300 overflow-hidden group text-black active:brightness-[25%] active:scale-100 hover:brightness-[70%] ease-linear transition-all duration-150 shadow-md ${className}`}>
        <img
          className="w-full h-[220px] lg:h-[300px] xl:h-[340px] group-hover:scale-[103%] group-hover:brightness-[80%] transition-all ease-in-out duration-300 object-cover"
          src={firstImage}
          alt=""
        />
        <div className="flex gap-2 justify-between my-5 px-2">
          <h2 className="font-SagarFont font-semibold text-sm">{title}</h2>
          <h2>{count} Photos</h2>

        </div>
      </div>
  );
}
