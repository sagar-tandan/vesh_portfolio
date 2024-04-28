import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config.jsx";
import { getDocs, collection, orderBy, limit, query } from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";
import BlogCard from "../components/BlogCard.jsx";
// import Slider from "react-slick";

export default function ProjectMain() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(
          query(collection(db, "Blogs"), orderBy("ref", "desc"))
        );
        const projectsData = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(projectsData);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching Projects!!", {
          position: "bottom-center",
          autoClose: 4000,
        });
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container flex flex-col mx-auto gap-2 mt-10">
      {/* <div className="flex flex-row justify-between"> */}
      {/* <div className="flex flex-col">
          <h1 className="font-bold font-SagarFont px-3 text-lg 2xl:text-2xl">
            Projects
          </h1>
          <p className="font-SagarFont px-3 text-sm md:text-lg">
            Here are some projects i have worked on :
          </p>
        </div> */}
      {/* <div className="font-SagarFont px-5 mx-3 my-2 text-sm md:text-lg 2xl:text-lg border rounded-3xl border-slate-600 flex items-center hover:bg-slate-600 hover:text-white hover:cursor-pointer active:bg-slate-800 ease-linear transition-all duration-150 ">
            <span>See More</span> <span className="pt-[1px] ml-1">&gt;</span>
          </div> */}
      {/* </div> */}

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
        <section className="container mx-auto flex flex-wrap items-start justify-start gap-1 ">
          {posts.map((post) => (
            <div className="p-1 w-full lg:w-[calc(33.33%-26px)] sm:w-[calc(50%-30px)] mx-auto" key={post.id}>
               <Link
                to={`/posts/${post.ref}`}
                state={{ title:post.title,
                  intro: post.intro,
                  content: post.content,
                  conclusion: post.conclusion,
                  mainImage: post.mainImage,
                  ref:post.ref,
                  id:post.id,
                  date: post.date.toDate().toString() }}
              >
                <BlogCard
                  title={post.title}
                  intro={post.intro}
                  content={post.content}
                  conclusion={post.conclusion}
                  mainImage={post.mainImage}
                  date={post.date}
                />
              </Link>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
