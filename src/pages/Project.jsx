import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config.jsx";
import { getDocs, collection, orderBy, limit, query } from "firebase/firestore";
import ProjectCard from "../components/ProjectCard.jsx";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "react-toastify";

//For slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Project() {
  //Slider Setting

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(
          query(collection(db, "Projects"), orderBy("ref", "desc"))
        );
        const projectsData = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProject(projectsData);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching Projects!!", {
          position: "bottom-center",
          autoClose: 4000,
        });
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container flex flex-col mx-auto gap-2 mt-10">
      <div className="flex flex-col">
        <h1 className="font-bold font-SagarFont px-3 text-xl 2xl:text-2xl">
          Projects
        </h1>
        <p className="font-SagarFont px-3 text-sm md:text-lg">
          Here are some projects i have worked on :
        </p>
      </div>

      {loading ? (
        <section className="container mx-auto flex flex-wrap items-center justify-center gap-5 mt-5">
          <InfinitySpin
            visible={loading}
            width="200"
            color="#475569"
            ariaLabel="infinity-spin-loading"
          />
        </section>
      ) : (
        <Slider
          className="bg-slate-300 container w-[95%] md:w-[100%] mx-auto mt-5"
          {...settings}
        >
          {project.map((post) => (
            <div className="p-5" key={post.id}>
              <ProjectCard
                title={post.title}
                description={post.desc}
                author={post.author}
                pdf={post.pdf}
                image={post.image}
                date={post.date}
                className="w-full"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
