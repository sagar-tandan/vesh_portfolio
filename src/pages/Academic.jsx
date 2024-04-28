import React from "react";
import school from "../assets/Images/school.png";
import college from "../assets/Images/college.png";
import plus2 from "../assets/Images/plus2.png";

export default function () {
  return (
    <div className="container flex flex-col mx-auto gap-2 mt-10">
      <div className="flex flex-col">
        <h1 className="font-bold font-SagarFont px-3 text-xl 2xl:text-2xl">
          Education
        </h1>
      </div>

      <div className="container max-w-screen-2xl mx-auto gap-1 flex flex-col justify-around items-center  lg:flex-row">
      <div className="lg:w-[30%] w-full bg-slate-300 opacity-90 rounded-xl glass-effect flex justify-center items-center">
          <div className="flex flex-col p-3">
            {/* <div className="flex flex-col gap-2 my-2 w-[70%]"> */}
            <h2 className="font-semibold font-SagarFont text-md">
              Secondary Education
            </h2>

            <div className="flex flex-row gap-2 my-2 w-[100%]">
              <div className="flex flex-col">
                <p className="font-medium font-SagarFont text-md w-[70%]">
                Shree Janapriya Secondary School , Tansen palpa</p>
                <span className="before:block before:absolute before:-inset-0.5 before:-skew-y-3 before:bg-slate-400 relative inline-block">
                  <span className="relative text-white font-SagarFont font-semibold p-2">
                    2014 - 2016
                  </span>
                </span>
              </div>
              <div className="flex items-center w-[30%]">
                <img className="w-24 p-2" src={school} alt="school" />
              </div>
            </div>
          </div>
        </div>
        <div className="my-1 border border-solid border-black lg:h-44 w-full lg:w-0"></div>

        <div className="lg:w-[30%] w-full bg-slate-300 opacity-90 rounded-xl glass-effect flex justify-center items-center">
          <div className="flex flex-col p-3">
            {/* <div className="flex flex-col gap-2 my-2 w-[70%]"> */}
            <h2 className="font-semibold font-SagarFont text-md">
              Higher Secondary Education
            </h2>
            <div className="flex flex-row gap-2 my-2 w-[100%]">
              <div className="flex flex-col">
                <p className="font-medium font-SagarFont text-md w-[70%]">
                Millennium Higher Secondary School, Tansen Palpa                </p>
                <span className="before:block before:absolute before:-inset-0.5 before:-skew-y-3 before:bg-slate-400 relative inline-block">
                  <span className="relative text-white font-SagarFont font-semibold p-2">
                    2016 - 2019
                  </span>
                </span>
              </div>
              <div className="flex items-center w-[30%]">
                <img className="w-24 p-2" src={plus2} alt="school" />
              </div>
            </div>
          </div>
        </div>

        <div className="my-1 border border-solid border-black lg:h-44 w-full lg:w-0"></div>

        <div className="lg:w-[30%] w-full bg-slate-300 opacity-90 rounded-xl glass-effect flex justify-center items-center">
          <div className="flex flex-col p-3">
            {/* <div className="flex flex-col gap-2 my-2 w-[70%]"> */}
            <h2 className="font-semibold font-SagarFont text-md">
              Bachelor's Degree in Civil Engineering
            </h2>

            <div className="flex flex-row gap-2 my-2 w-[100%]">
              <div className="flex flex-col">
                <p className="font-medium font-SagarFont text-md w-[70%]">
                  TU, IOE-Purwanchal Engineering Campus, Dharan
                </p>
                <span className="before:block before:absolute before:-inset-0.5 before:-skew-y-3 before:bg-slate-400 relative inline-block">
                  <span className="relative text-white font-SagarFont font-semibold p-2">
                    2019 - 2024
                  </span>
                </span>
              </div>
              <div className="flex items-center w-[30%]">
                <img className="w-24 p-2" src={college} alt="school" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
