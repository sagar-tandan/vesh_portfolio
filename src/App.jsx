import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import ProjectMain from "./pages/ProjectMain.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import UploadProjects from "./pages/Admin/UploadProjects.jsx";
import UploadPhotos from "./pages/Admin/UploadPhotos.jsx";
import GalleryDetail from "./pages/GalleryDetail.jsx";
import UploadBlog from "./pages/Admin/UploadBlog.jsx";
import Postcards from "./components/Postcards.jsx";
import Login from "./pages/Admin/Login.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import { useState, useEffect } from "react";
import { auth } from "./firebase-config.jsx";
import DisplayProjects from "./pages/Admin/DisplayProjects.jsx";
import DisplayPosts from "./pages/Admin/DisplayPosts.jsx";
import UploadCv from "./pages/Admin/UploadCv.jsx";

function App() {
  const [user, setuser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setuser(authUser.uid);
        // setuser(null);
      } else {
        setuser(null);
      }
    });
  }, []);
  // console.log(user);

  const logout = () => {
    auth.signOut(); // Sign out the user
  }

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/replaceCv"element={user ? ( <UploadCv /> ) : (<>  <Navigate to="/login" /></> )} />
        <Route path="/posts/" element={<ProjectMain />} />
        <Route path="/posts/:id" element={<BlogDetail />} />
        <Route path="gallery/:folderName" element={<GalleryDetail />} />
        <Route path="/admin/uploadprojects" element={user ? (<UploadProjects />) : ( <> <Navigate to="/login" /></>)}/>
        <Route path="/admin/uploadphotos" element={user ? (  <UploadPhotos /> ) : (<>  <Navigate to="/login" /></>)} />
        <Route path="/admin/uploadprojects/displayprojects" element={ user ? (<DisplayProjects />) : (<>  <Navigate to="/login"/></> )} />
        <Route path="/admin/uploadblogs/displayblogs" element={ user ? (<DisplayPosts />) : (<>  <Navigate to="/login"/></> )} />
        <Route path="/admin/uploadblogs" element={user ? ( <UploadBlog /> ) : (<>  <Navigate to="/login" /></> )} />
        <Route path="/login/" element={ user ? ( <Admin user={user} logout={logout} /> ) : (  <>  <Login /></>  )}/>
        <Route path="/admin/" element={ user ? ( <Admin user={user} logout={logout} /> ) : (  <>  <Navigate to="/login" /></>  )}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
