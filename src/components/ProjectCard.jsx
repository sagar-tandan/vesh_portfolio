import React, { useState } from "react";
import veshraj from "../assets/Images/veshraj.jpg";

export default function ({ PostID, title, author, description, pdf,image,date,className}) {
  const projectTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;
  const projectDesc = description.length > 150 ? description.substr(0, 150) + "..." : description;

  //splitting date 
  const parts = date.toDate().toString().split(' ').map(part => part.trim());
  





  return (
    <div className={`group m-1 flex flex-col rounded-md overflow-hidden hover:bg-[#0000005c] active:bg-slate-500 active:scale-100 ease-linear transition-all duration-150 shadow-md ${className}`}>
    
      <a href={`${pdf}.pdf`} target="_blank" rel="noreferrer " >

        <img src={image} alt="Project 1" className="w-full h-[180px] md:h-[210px] lg:h-[240px] xl:h-[270px] active:brightness-20 group-hover:scale-[102%] group-hover:brightness-50 ease-linear transition-all duration-300" />

        <div className="flex flex-col gap-1 p-3">
          <h2 className="font-semibold font-SagarFont xl:text-lg ">
            {projectTitle}
          </h2>
          <p className="font-SagarFont text-sm 2xl:text-lg">
            {projectDesc}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center px-3">
          <div className="flex items-center gap-3">
            <img
            src={veshraj}
              alt="profile image"
              className="w-10 h-10 rounded-full p-1"
            />
            <h3 className="font-medium font-SagarFont text-sm">
              Veshraj Pangeni
            </h3>
          </div>
          <span className="font-SagarFont font-semibold text-sm">
            {parts[2]} {parts[1]}
          </span>
        </div>
      </a>
    </div>
  );
}




