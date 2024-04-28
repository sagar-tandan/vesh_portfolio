import React from "react";

export default function CommentCard({ name, email, comment, date, className }) {
  const parts = date
    .toDate()
    .toString()
    .split(" ")
    .map((part) => part.trim());

    const namee = name.length > 20 ? name.substr(0, 20) + "..." : name;


  return (
    <div className={`flex bg-[#b8c2ce] flex-col mb-3 shadow-md p-2 ${className}`}>
      <h1 className="font-SagarFont font-semibold text-sm">{namee}</h1>
      <div className="flex">
        <h2 className="font-SagarFont font-extralight text-sm text-[#545454] p-1">{email} |</h2>
        <h3 className="font-SagarFont font-extralight text-sm text-[#545454] p-1">{parts[1]} {parts[2]}, {parts[3]}</h3>
      </div>

      <p className="font-SagarFont font-normal  text-black text-md ">{comment}</p>
    </div>
  );
}
