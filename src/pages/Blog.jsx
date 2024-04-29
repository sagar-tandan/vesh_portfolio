import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config.jsx";
import { getDocs, collection, orderBy, limit, query } from "firebase/firestore";
import BlogCard from "../components/BlogCard.jsx";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Blog() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let limitNumber = 3; // default limit

        // Check the screen width to determine the layout
        if (window.innerWidth < 1024) {
          limitNumber = 2;
        }

        const PostsSnapshot = await getDocs(
          query(
            collection(db, "Blogs"),
            orderBy("ref", "desc"),
            limit(limitNumber)
          )
          
    
        );
        const PostsData = PostsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(PostsData);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching Projects!!", {
          position: "bottom-center",
          autoClose: 4000,
        });
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container flex flex-col mx-auto gap-2 mt-20">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold font-SagarFont px-3 text-xl 2xl:text-2xl">
            Recent Posts
          </h1>
        </div>
        <Link to="/posts">
          <div className="font-SagarFont px-2 mx-7 my-2 text-sm md:text-lg 2xl:text-lg border rounded-3xl border-slate-600 flex items-center hover:bg-slate-600 hover:text-white hover:cursor-pointer active:bg-slate-800 ease-linear transition-all duration-150 ">
            <span>See More</span> <span className="pt-[1px] ml-1">&gt;</span>
          </div>
        </Link>
      </div>

      {loading ? (
        <section className="container mx-auto flex flex-wrap items-center justify-center gap-5">
          <InfinitySpin
            visible={loading}
            width="200"
            color="#475569"
            ariaLabel="infinity-spin-loading"
          />
        </section>
      ) : (
        <div className="bg-slate-300 container w-[95%] md:w-[100%] mx-auto flex flex-col md:flex-row mr-4">
          {posts.map((post) => (
            <div className="px-4 py-1" key={post.id}>
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
                  className="w-full"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
