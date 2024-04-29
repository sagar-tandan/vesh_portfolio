import React, { useState, useEffect } from "react";
import veshraj from "../../src/assets/Images/veshraj.jpg";
import Project from "./Project.jsx";
import Contact from "./Contact.jsx";
import Gallery from "./Gallery.jsx";
import Academic from "./Academic.jsx";
import Blog from "./Blog.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../firebase-config.jsx";
import { getDoc, collection, query, doc } from "firebase/firestore";

export default function Home() {
  const [cv, setCV] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const CvSnapshot = await getDoc(query(doc(db, "CV", "veshraj")));
        const cvContent = CvSnapshot.data();
        setCV(cvContent.cv);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching Projects!!", {
          position: "bottom-center",
          autoClose: 4000,
        });
        setLoading(false);
      }
    };
    fetchCv();
  }, []);

  return (
    <div>
      <div className="container flex flex-col-reverse mx-auto mt-10 p-2 gap-5 items-center justify-center md:flex-row">
        <div className="flex flex-col gap-5 w-full md:w-3/5 lg:w-4/5 p-3">
          <h2 className="font-bold text-xl font-SagarFont">
            Hello! I am Veshraj Pangeni, Civil Engineer from Nepal.
          </h2>
          <p className="font-SagarFont">
            As a civil engineer, I specialize in the planning, design,
            construction, and maintenance of infrastructure such as roads,
            bridges, and buildings. Currently, I am employed as a site
            supervisor within the Department of Roads in Nepal.
          </p>

          <p className="font-SagarFont">
            Apart from my work, I love to read. I enjoy all kinds of books, from
            spiritual texts to novels ,poetry and more. I also prioritize
            fitness.In my free time, I love watching games, particularly
            football and cricket. These interests keep me balanced and add
            richness to my life.
          </p>


            <div className="w-1/2 md:w-full md:mx-0 md:justify-start flex items-center justify-center mx-auto">
            <a href={cv} target="_blank" rel="noreferrer ">

            <button className="bg-slate-600 rounded-md w-full md:w-[70%] py-4 px-12 text-white  active:bg-slate-800 hover:bg-slate-700 transition-all duration-300 ease-in-out ">
              View CV
            </button>
            </a>
            </div>
            


        </div>

        <img
          className="rounded-full w-2/3 md:w-1/2 md:rounded-3xl lg:w-1/3 xl:w-1/4  mx-auto"
          src={veshraj}
          alt=""
        />
      </div>

      <div id="education">
        <Academic />
      </div>

      <div id="projects">
        <Project />
      </div>

      <div id="gallery">
        <Gallery />
      </div>

      <div id="posts">
        <Blog />
      </div>

      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
