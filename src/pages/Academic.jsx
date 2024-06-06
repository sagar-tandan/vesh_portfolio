import React from "react";
import school from "../assets/schooll.jpg";
import college from "../assets/plus2.jpg";
import erc from "../assets/erc.jpg";

export default function () {
  return (
    <div className="container flex flex-col mx-auto gap-2 mt-10">
      <div className="flex flex-col mx-auto md:mx-0">
        <h1 className="font-bold font-SagarFont px-3 text-xl 2xl:text-2xl mb-3">
          Education
        </h1>
      </div>

      <div className="container max-w-screen-2xl gap-3 flex lg:flex-row lg:justify-between items-center lg:mx-3 flex-col w-[90%] mx-auto md:w-full">
        <div className="relative lg:w-[30%] w-full bg-slate-300 opacity-90 rounded-xl glass-effect flex justify-start items-center shadow-lg">
          <div className=" w-full overflow-hidden absolute top-0 bottom-0 left-0 right-0 rounded-xl z-[-1]">
            <img
              className="brightness-[30%] object-cover "
              src={school}
              alt="school"
            />
          </div>
          <div className="flex flex-col p-3">
            {/* <div className="flex flex-col gap-2 my-2 w-[70%]"> */}
            <h2 className="font-semibold font-SagarFont text-lg text-white">
              Secondary Education
            </h2>

            <div className="flex flex-row gap-2 my-2 w-[100%] text-white">
              <div className="flex flex-col">
                <a
                  href="https://www.facebook.com/janapriyaschoolpalpa/"
                  target="_blank"
                >
                  <p className="font-medium font-SagarFont text-md w-[100%] hover:cursor-pointer hover:underline">
                    Shree Janapriya Secondary School , Tansen palpa
                  </p>
                </a>
                {/* <span className="before:block before:absolute before:-inset-0.5 before:-skew-y-3 before:bg-slate-400 relative inline-block"> */}
                <span className="relative text-white font-SagarFont font-semibold py-2">
                  2014 - 2016
                </span>
                {/* </span> */}
              </div>
              {/* <div className="flex items-center w-[30%]">
                <img className="w-24 p-2" src={school} alt="school" />
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="my-1 border border-solid border-black lg:h-44 w-full lg:w-0"></div> */}

        <div className="relative lg:w-[30%] w-full bg-slate-300 opacity-90 rounded-xl glass-effect flex justify-start items-center shadow-lg">
          <div className=" w-full overflow-hidden absolute top-0 bottom-0 left-0 right-0 rounded-xl z-[-1]">
            <img
              className="brightness-[30%] object-cover "
              src={college}
              alt="school"
            />
          </div>
          <div className="flex flex-col p-3 text-white">
            {/* <div className="flex flex-col gap-2 my-2 w-[70%]"> */}
            <h2 className="font-semibold font-SagarFont text-lg">
              Higher Secondary Education
            </h2>
            <div className="flex flex-row gap-2 my-2 w-[100%]">
              <div className="flex flex-col">
                <a
                  href="https://www.collegenp.com/college/millennium-secondary-school-palpa/"
                  target="_blank"
                >
                  <p className="font-medium font-SagarFont text-md w-[100%] hover:cursor-pointer hover:underline">
                    Millennium Higher Secondary School, Tansen Palpa{" "}
                  </p>
                </a>
                {/* <span className="before:block before:absolute before:-inset-0.5 before:-skew-y-3 before:bg-slate-400 relative inline-block"> */}
                <span className="relative font-SagarFont font-semibold py-2">
                  2016 - 2019
                </span>
                {/* </span> */}
              </div>
              {/* <div className="flex items-center w-[30%]">
                <img className="w-24 p-2" src={plus2} alt="school" />
              </div> */}
            </div>
          </div>
        </div>

        {/* <div className="my-1 border border-solid border-black lg:h-44 w-full lg:w-0"></div> */}

        <div className="relative lg:w-[30%] w-full bg-slate-300 opacity-90 rounded-xl glass-effect flex justify-start items-center shadow-lg">
          <div className=" w-full overflow-hidden absolute top-0 bottom-0 left-0 right-0 rounded-xl z-[-1]">
            <img
              className="brightness-[30%] object-cover "
              src={erc}
              alt="school"
            />
          </div>
          <div className="flex flex-col p-3 text-white">
            {/* <div className="flex flex-col gap-2 my-2 w-[70%]"> */}
            <h2 className="font-semibold font-SagarFont text-lg">
              Bachelor's Degree in Civil Engineering
            </h2>

            <div className="flex flex-row gap-2 my-2 w-[100%]">
              <div className="flex flex-col">
                <a href="https://www.ioepc.edu.np/" target="_blank">
                  <p className="font-medium font-SagarFont text-md w-[100%] hover:cursor-pointer hover:underline">
                    TU, IOE-Purwanchal Engineering Campus, Dharan
                  </p>
                </a>
                {/* <span className="before:block before:absolute before:-inset-0.5 before:-skew-y-3 before:bg-slate-400 relative inline-block"> */}
                <span className="relative font-SagarFont font-semibold py-2">
                  2019 - 2024
                </span>
                {/* </span> */}
              </div>
              {/* <div className="flex items-center w-[30%]">
                <img className="w-24 p-2" src={college} alt="school" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
