import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useHistory
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { db } from "../firebase-config.jsx";
import {
  getDocs,
  addDoc,
  collection,
  orderBy,
  limit,
  query,
  Timestamp,
} from "firebase/firestore";
import Postcards from "../components/Postcards.jsx";
import { toast } from "react-toastify";
import CommentCard from "../components/CommentCard.jsx";

export default function BlogDetail() {
  const [posts, setPost] = useState([]);

  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState([]);
  const [dates, setDate] = useState([]);
  const [intro, setIntro] = useState([]);
  const [content, setContent] = useState([]);
  const [conclusion, setConclusion] = useState([]);
  const [ref, setref] = useState("");
  const [idmain, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Extract location state

  const [allComment, setAllComment] = useState([]);

  //for comment sections
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchPosts = async () => {
    try {
      const PostsSnapshot = await getDocs(
        query(collection(db, "Blogs"), orderBy("ref", "desc"), limit(6))
      );
      const PostsData = PostsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPost(PostsData);
    } catch (error) {
      toast.error("Error fetching Projects!!", {
        position: "bottom-center",
        autoClose: 4000,
      });
    }
  };

  const fetchComments = async () => {
    try {
      const commentsss = await getDocs(
        query(
          collection(db, `Blogs/${idmain}/comments`),
          orderBy("date", "desc")
        )
      );
      const comments = commentsss.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllComment(comments);
    } catch (error) {
      toast.error("Error fetching comments!!", {
        position: "bottom-center",
        autoClose: 4000,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    // Extract imageUrls from location state if available
    const mainImage = location.state && location.state.mainImage;
    const title = location.state && location.state.title;
    const date = location.state && location.state.date;
    setDate(date.split(" ").map((part) => part.trim()));
    const intro = location.state && location.state.intro;
    const content = location.state && location.state.content;
    const conclusion = location.state && location.state.conclusion;
    const ref = location.state && location.state.ref;
    const id = location.state && location.state.id;

    setImageUrls(mainImage);
    setTitle(title);
    setIntro(intro);
    setContent(content);
    setConclusion(conclusion);
    setref(ref);
    setId(id);

    // Simulate loading for 2 seconds
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timeout when the component unmounts or when location.state changes
    return () => clearTimeout(timeoutId);
  }, [location.state]);

  //for fetching the comments
  useEffect(() => {
    // Call fetchComments when id changes
    if (idmain) {
      fetchComments();
    }
  }, [idmain]);

  //handle click
  const handleClick = async (e) => {
    e.preventDefault();
    let toast_id;
    try {
      toast_id = toast.loading("Please wait...", {
        position: "bottom-center",
      });

      await addDoc(collection(db, "Blogs/" + idmain + "/comments"), {
        comment: formData.comment,
        name: formData.name,
        email: formData.email,
        date: Timestamp.fromDate(new Date()),
      });
      toast.update(toast_id, {
        render: "Comment added successfully!",
        type: "success",
        position: "bottom-center",
        isLoading: false,
        autoClose: 2000,
      });
      setFormData({
        name: "",
        email: "",
        comment: "",
      });
    } catch (error) {
      toast.update(toast_id, {
        render: "Something went wrong!",
        type: "error",
        position: "bottom-center",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      {loading ? (
        <div className="container flex flex-col items-center justify-center max-w-screen-2xl mx-auto p-8 gap-4 xl:flex-row ">
          <InfinitySpin
            visible={loading}
            width="200"
            color="#475569"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <div className="container flex flex-col max-w-screen-2xl mx-auto p-8 gap-4 xl:flex-row ">
          <div className="w-full xl:w-[75%] flex flex-col">
            <img
              className="w-full mb-5 h-[25vh] md:h-[40vh] lg:h-[60vh]"
              src={imageUrls}
              alt="cover"
            />
            <h2 className="font-SagarFont font-bold text-lg">{title}</h2>
            <div className="flex font-SagarFont font-medium mt-1 text-[#3d3d3d]">
              <h3>By Veshraj Pangeni</h3>
              <span className="ml-2">
                -{dates[1]} {dates[2]}, {dates[3]}
              </span>
            </div>
            <p className="mt-6 font-SagarFont">{intro}</p>
            <p className="mt-4 font-SagarFont">{content}</p>
            <p className="my-4 font-SagarFont">{conclusion}</p>

            <div className="my-2 border border-solid border-[#5b5b5c] h-0.2"></div>

            {/* for comments to display */}
            {allComment && allComment.length > 0 && (
              <div>
                <div className="flex flex-row justify-between">
                  <h2 className="font-SagarFont font-bold mb-3">Comments</h2>
                </div>
                {allComment.map((comment) => (
                  <div key={comment.id}>
                    <CommentCard
                      name={comment.name}
                      email={comment.email}
                      comment={comment.comment}
                      date={comment.date}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            )}

            <h2 className="font-SagarFont font-bold mb-3 mt-10">Leave a comment</h2>
            <form onSubmit={handleClick} action="">
              <textarea
                placeholder="Your comment"
                value={formData.comment}
                required
                name="comment"
                onChange={handleChange}
                className="p-3 mb-3 text-black font-SagarFont font-medium bg-slate-300 text-sm border-[#5b5b5c] border-[1px] w-full h-44"
              />
              <div className="container flex justify-between my-3 sm:w-1/2 gap-3">
                <input
                  className="p-2 bg-slate-300 border-black border-[1px] w-1/2"
                  type="text"
                  value={formData.name}
                  required
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name *"
                />

                <input
                  className="p-2 bg-slate-300 border-black border-[1px] w-1/2"
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  placeholder="Email *"
                />
              </div>

              <button className="flex justify-start py-2 px-10 hover:bg-slate-500 hover:border-slate-500 active:bg-slate-700 border-black border-[1px] max-w-min font-SagarFont font-medium my-3 transition-all ease-in-out duration-500">
                Submit
              </button>
            </form>
          </div>

          <div className="xl:w-[25%] w-full flex flex-col items-center">
            <h2 className="font-SagarFont font-bold text-lg mt-1 underline">
              Other Posts
            </h2>

            {posts.map(
              (post) =>
                // Check if the post ref is not equal to the current post's ref
                post.ref !== ref && (
                  <div className="p-1" key={post.id}>
                    <Link
                      to={`/posts/${post.ref}`}
                      state={{
                        title: post.title,
                        intro: post.intro,
                        content: post.content,
                        conclusion: post.conclusion,
                        mainImage: post.mainImage,
                        ref: post.ref,
                        date: post.date.toDate().toString(),
                      }}
                    >
                      <Postcards
                        title={post.title}
                        intro={post.intro}
                        content={post.content}
                        conclusion={post.conclusion}
                        mainImage={post.mainImage}
                        date={post.date}
                        className="w-full h-36 lg:h-28"
                      />
                    </Link>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
