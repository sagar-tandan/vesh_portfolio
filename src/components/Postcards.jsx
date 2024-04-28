import React, { useEffect, useState } from "react";

export default function Postcards({
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

  const postTitle = title.length > 20 ? title.substr(0, 20) + "..." : title;
  const postDesc = intro.length > 70 ? intro.substr(0, 70) + "..." : intro;

  return (
    <div
      className={`group gap-1 m-2 flex flex-row rounded-lg overflow-hidden hover:scale-[102%] hover:bg-[#00000065] active:brightness-50 active:scale-100 ease-linear transition-all duration-150 ${className} shadow-md`}
    >
      <img
      className="w-1/3 group-hover:brightness-75"
      src={mainImage}
        alt="thumbnail"
      />
      <div className="flex flex-col gap-[2px]">
        <h2 className="font-SagarFont font-medium">{postTitle}</h2>
        <h3 className="font-SagarFont font-extralight text-sm text-[#4d4d4d]"> {parts[1]} {parts[2]}, {parts[3]}</h3>
        <p className="font-SagarFont font-light text-sm text-[#4d4d4d] pb-1">{postDesc}</p>
      </div>
    </div>
  );
}
