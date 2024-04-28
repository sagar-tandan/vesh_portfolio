import React from 'react';
import UploadPhotos from './UploadPhotos';
import UploadProjects from './UploadProjects';
import UploadBlog from './UploadBlog';
import { Link } from 'react-router-dom';


export default function Admin
({ user, logout }) {

  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // Call the logout function passed as a prop
  }
  return (
    <div className="container mx-auto flex flex-col gap-4 mt-10 max-w-screen-md">
        <Link to = '/admin/uploadprojects' className='bg-slate-400 mx-5 p-3 rounded font-SagarFont font-semibold hover:bg-slate-500 active:bg-slate-700 transition-all ease-in-out duration-500 flex items-center justify-center'>
        <button className=''>Upload Projects</button>
        </Link>
        
        <Link to = '/admin/uploadphotos' className='bg-slate-400 mx-5 p-3 rounded font-SagarFont font-semibold hover:bg-slate-500 active:bg-slate-700 transition-all ease-in-out duration-500 flex items-center justify-center'>
        <button className=''>Upload Photos</button>
        </Link>

        <Link to = '/admin/uploadblogs' className='bg-slate-400 mx-5 p-3 rounded font-SagarFont font-semibold hover:bg-slate-500 active:bg-slate-700 transition-all ease-in-out duration-500 flex items-center justify-center'>
        <button className=''>Upload Posts</button>
        </Link>
        
        <button className='bg-slate-400 mx-[30%] mt-16 p-3 rounded font-SagarFont font-semibold hover:bg-slate-500 active:bg-slate-700 transition-all ease-in-out duration-500' onClick={handleLogout}>Log Out</button>

    </div>
    
  )
}
