import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({user}) {


  const userId =user?.uid;
  // console.log("userId", userId)
  // console.log("email", user?.email)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const [activeMenuItem, setActiveMenuItem] = useState('home');
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  
  };

    // Function to set active menu item
    const setActive = (menuItem) => {
      setActiveMenuItem(menuItem);
    };


  return (
    <header className="bg-slate-300 shadow-md">
      <div className="flex justify-between 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md items-center mx-auto">
        <Link to="/">
          <h1 className=" p-3 font-bold text-md md:text-xl flex flex-wrap">
            <span className="font-SagarFont2 text-slate-500">Veshraj</span>
            <span className="font-SagarFont2 text-slate-700">Pangeni</span>
          </h1>
        </Link>
        <ul className="md:flex gap-8 m-3">
          <Link to="/">
          <li className={`font-SagarFont text-lg font-semibold ${activeMenuItem === 'home' ? 'text-slate-600' : 'text-slate-900'} hidden md:inline link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('home')}>
              Home
            </li>
          </Link>
          <li className={`font-SagarFont text-lg font-semibold ${activeMenuItem === 'education' ? 'text-slate-600' : 'text-slate-900'} hidden md:inline link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('education')}>
            <a href="#education">Education</a>
          </li>
          <li className={`font-SagarFont text-lg font-semibold ${activeMenuItem === 'projects' ? 'text-slate-600' : 'text-slate-900'} hidden md:inline link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('projects')}>
            <a href="#projects">Projects</a>
          </li>
          <li className={`font-SagarFont text-lg font-semibold ${activeMenuItem === 'gallery' ? 'text-slate-600' : 'text-slate-900'} hidden md:inline link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('gallery')}>
            <a href="#gallery">Gallery</a>
          </li>
          <li className={`font-SagarFont text-lg font-semibold ${activeMenuItem === 'contact' ? 'text-slate-600' : 'text-slate-900'} hidden md:inline link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('contact')}>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 md:hidden cursor-pointer m-3 hover:cursor-pointer active:scale-90 ease-linear transition-all duration-150"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={toggleMobileMenu} // Add onClick event to toggle mobile menu
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>

        {/* Mobile Menu */}
        <ul
          className={`${
            mobileMenuOpen ? 'top-12' : '-top-full'
          } absolute shadow-md p-3 w-full md:hidden flex flex-col gap-4 justify-start items-start transition-top duration-300 ease-in-out bg-slate-300`}
        >
          <Link to="/">
          <li className={`font-SagarFont text-sm font-semibold ${activeMenuItem === 'home' ? 'text-slate-600' : 'text-black'}  link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('home')}>
              Home
            </li>
          </Link>

          <li className={`font-SagarFont text-sm font-semibold ${activeMenuItem === 'education' ? 'text-slate-600' : 'text-black'}  link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('education')}>
            <a href="#education">Education</a>
          </li>

          <li className={`font-SagarFont text-sm font-semibold ${activeMenuItem === 'projects' ? 'text-slate-600' : 'text-black'}  link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('projects')}>
            <a href="#projects">Projects</a>
          </li>
          <li className={`font-SagarFont text-sm font-semibold ${activeMenuItem === 'gallery' ? 'text-slate-600' : 'text-black'}  link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('gallery')}>
            <a href="#gallery">Gallery</a>
          </li>
          <li className={`font-SagarFont text-sm font-semibold ${activeMenuItem === 'contact' ? 'text-slate-600' : 'text-black'}  link-underline link-underline-black  hover:cursor-pointer`} onClick={() => setActive('contact')}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
