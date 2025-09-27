// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants/routes";

export default function Navbar() {
 const { isAuthenticated, logout } = useAuth();
 const navigate = useNavigate();
 const location = useLocation(); // Get the current location object
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const handleLogout = () => {
  logout();
  navigate(ROUTES.LOGIN);
  setIsMenuOpen(false);
 };

 const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
 };

 // Function to get the link classes, including active styles
 const getLinkClasses = (path) => {
  const baseClasses = "text-gray-600 hover:text-indigo-600 font-medium transition-colors";
  const activeClasses = "text-indigo-600 font-semibold border-b-2 border-indigo-600";
  return `${baseClasses} ${location.pathname === path ? activeClasses : ""}`;
 };

 // Function for mobile links
 const getMobileLinkClasses = (path) => {
  const baseClasses = "block px-3 py-2 rounded-md text-base font-medium transition-colors";
  const activeClasses = "bg-indigo-50 text-indigo-600";
  const inactiveClasses = "text-gray-800 hover:bg-gray-100";
  return `${baseClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`;
 };

 return (
  <nav className="bg-white text-gray-800 shadow-lg sticky top-0 z-50 transition-all duration-300">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    {/* Logo */}
    <Link to="/" className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors">
     MeetConnect
    </Link>

    {/* Desktop Links */}
    <div className="hidden md:flex items-center space-x-6">
     {isAuthenticated ? (
      <>
       <Link to={ROUTES.DASHBOARD} className={getLinkClasses(ROUTES.DASHBOARD)}>
        Dashboard
       </Link>
       <Link to={ROUTES.INTERVIEWS} className={getLinkClasses(ROUTES.INTERVIEWS)}>
        My Interviews
       </Link>
       <Link to={ROUTES.PRACTICE} className={getLinkClasses(ROUTES.PRACTICE)}>
        Practice
       </Link>
       <Link to={ROUTES.ABOUTUS} className={getLinkClasses(ROUTES.ABOUTUS)}>
        About Us
       </Link>
       <Link to={ROUTES.PROFILE} className={`${getLinkClasses(ROUTES.PROFILE)} flex items-center gap-1`}>
        <UserIcon className="w-5 h-5" />
        Profile
       </Link>
      
       <button
        onClick={handleLogout}
        className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium transition-colors"
       >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Logout
       </button>
      </>
     ) : (
      <>
       <Link to={ROUTES.LOGIN} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
        Login
       </Link>
       <Link to={ROUTES.SIGNUP} className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
        Signup
       </Link>
      </>
     )}
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden flex items-center">
     <button onClick={toggleMenu} className="text-gray-600 hover:text-indigo-600 focus:outline-none">
      {isMenuOpen ? (
       <XMarkIcon className="w-8 h-8" />
      ) : (
       <Bars3Icon className="w-8 h-8" />
      )}
     </button>
    </div>
   </div>

   {/* Mobile Menu */}
   <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
     {isAuthenticated ? (
      <>
       <Link onClick={toggleMenu} to={ROUTES.DASHBOARD} className={getMobileLinkClasses(ROUTES.DASHBOARD)}>
        Dashboard
       </Link>
       <Link onClick={toggleMenu} to={ROUTES.INTERVIEWS} className={getMobileLinkClasses(ROUTES.INTERVIEWS)}>
        My Interviews
       </Link>
       <Link onClick={toggleMenu} to={ROUTES.PRACTICE} className={getMobileLinkClasses(ROUTES.PRACTICE)}>
        Practice
       </Link>
       <Link onClick={toggleMenu} to={ROUTES.ABOUTUS} className={getMobileLinkClasses(ROUTES.ABOUTUS)}>
        About Us
       </Link>
       <Link onClick={toggleMenu} to={ROUTES.PROFILE} className={getMobileLinkClasses(ROUTES.PROFILE)}>
        Profile
       </Link>
       <button
        onClick={handleLogout}
        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition-colors"
       >
        Logout
       </button>
      </>
     ) : (
      <>
       <Link onClick={toggleMenu} to={ROUTES.LOGIN} className={getMobileLinkClasses(ROUTES.LOGIN)}>
        Login
       </Link>
       <Link onClick={toggleMenu} to={ROUTES.SIGNUP} className={getMobileLinkClasses(ROUTES.SIGNUP)}>
        Signup
       </Link>
      </>
     )}
    </div>
   </div>
  </nav>
 );
}