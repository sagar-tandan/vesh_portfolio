import React from "react";
import veshraj from "../assets/Images/veshraj.jpg";

export default function BlogCard({
  title,
  intro,
  content,
  conclusion,
  mainImage,
  date,
  className,
}) {
  const parts = date
    .toDate()
    .toString()
    .split(" ")
    .map((part) => part.trim());

  const postTitle = title.length > 25 ? title.substr(0, 25) + "..." : title;
  const postDesc = intro.length > 150 ? intro.substr(0, 150) + "..." : intro;

  return (
    <div
      className={`group m-1 flex flex-col rounded overflow-hidden hover:scale-[102%] hover:bg-[#0000005c] active:brightness-50 active:scale-100 ease-linear transition-all duration-150 shadow-md  ${className}`}
    >
      <img
        src={mainImage}
        alt="thumbnail"
        className="w-full h-[180px] md:h-[210px] lg:h-[220px]  active:brightness-50 group-hover:brightness-50 ease-linear transition-all duration-150"
      />


      <div className="flex flex-col p-3">
        <h2 className="font-semibold font-SagarFont xl:text-lg ">
          {postTitle}
        </h2>

        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="font-SagarFont font-light">
              {parts[1]} {parts[2]}, {parts[3]} |
            </span>
            <h3 className="font-light font-SagarFont"> Veshraj Pangeni</h3>
          </div>
        </div>

        <p className="mt-2 font-SagarFont text-sm 2xl:text-lg">{postDesc}</p>
      </div>

    </div>
  );
}
