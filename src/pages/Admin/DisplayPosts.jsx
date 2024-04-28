import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config.jsx";
import { getDocs, collection, orderBy, limit, query ,deleteDoc,doc} from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function DisplayPosts() {
    const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);


  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
  const [deletePostId, setDeletePostId] = useState(null); // State to store the ID of the project to delete

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postSnapshot = await getDocs(
          query(collection(db, "Blogs"), orderBy("ref", "desc"))
        );
        const postData = postSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(postData);
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

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "Blogs", postId));
    //   console.log((doc(db, "Projects", projectId)))
      setPost(post.filter(project => post.id !== postId));
      toast.success("Post deleted successfully", {
        position: "bottom-center",
        autoClose: 4000,
      });
    } catch (error) {
      toast.error("Error deleting Post!!", {
        position: "bottom-center",
        autoClose: 4000,
      });
    }
  };

  const handleDeleteConfirmation = (postId) => {
    setShowDialog(true);
    setDeletePostId(postId);
  };

  const confirmDelete = () => {
    deletePost(deletePostId);
    setShowDialog(false);
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };


  return (
    <div className="container flex flex-col mx-auto gap-2 mt-10">
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

        <div className="bg-slate-300 container max-w-screen-lg mx-auto mt-5">
        {post.map((post) => (
          <div className="p-5 " key={post.id}>
            <div className="flex justify-between bg-slate-400 mx-auto items-center">
            <h1 className="p-3 overflow-hidden whitespace-nowrap overflow-ellipsis">{post.title}</h1>
            <h2 className="bg-red-600 p-3 hover:cursor-pointer active:bg-red-900 hover:bg-red-700" onClick={() => handleDeleteConfirmation(post.id)}>Delete</h2>
            </div>

          </div>
        ))}
      </div>

      )}

    {/* Confirmation Dialog */}
    {showDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900" id="modal-title">
                      Delete post
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this post? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button onClick={cancelDelete} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
