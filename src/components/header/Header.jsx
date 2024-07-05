import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { doSignInWithGoogle, doSignOut } from "../../firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    // <header className="bg-zinc-100 text-gray-800 shadow-sm">
    //   <nav className="container mx-auto flex justify-between items-center py-4 px-36 font-apercu">
    //     <Link to="/home" className="text-xl font-semibold">
    //       Rapid Routez
    //     </Link>
    //     <div className="flex gap-5">
    //       <Link
    //         to="/home"
    //         className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
    //       >
    //         Home
    //       </Link>
    //       <Link
    //         to="/SearchRide"
    //         className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
    //       >
    //         Search Ride
    //       </Link>
    //       <Link
    //         to="/CreateRide"
    //         className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
    //       >
    //         Create Ride
    //       </Link>
    //       <Link
    //         to="/Rides"
    //         className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
    //       >
    //         Rides
    //       </Link>
    //       <Link
    //         to="/DriverPortal"
    //         className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
    //       >
    //         Driver's Portal
    //       </Link>

    //       {userLoggedIn ? (
    //         <button
    //           onClick={() => {
    //             doSignOut().then(() => {
    //               navigate("/login");
    //             });
    //           }}
    //           className="hover:underline relative left-20"
    //         >
    //           Logout
    //         </button>
    //       ) : (
    //         <button
    //           onClick={() => {
    //             navigate("/login");
    //           }}
    //           className="hover:underline relative left-20"
    //         >
    //           Login
    //         </button>
    //       )}
    //     </div>
    //   </nav>
    // </header>

    <header className="bg-zinc-100 text-gray-800 shadow-sm">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-36 font-apercu">
        <Link to="/home" className="text-xl font-semibold">
          Rapid Routez
        </Link>
        {/* Hamburger icon */}
        <div className="block sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none focus:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
        {/* Desktop menu */}
        <div className="hidden sm:flex gap-5">
          <Link
            to="/home"
            className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
          >
            Home
          </Link>
          <Link
            to="/SearchRide"
            className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
          >
            Search Ride
          </Link>
          <Link
            to="/CreateRide"
            className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
          >
            Create Ride
          </Link>
          <Link
            to="/Rides"
            className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
          >
            Rides
          </Link>
          <Link
            to="/DriverPortal"
            className="hover:text-white hover:bg-[#0c0c0c] px-3 py-[2px] transition-colors rounded duration-200"
          >
            Driver's Portal
          </Link>
          {userLoggedIn ? (
            <button
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/login");
                });
              }}
              className="hover:underline"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="hover:underline"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      
      {menuOpen && (
        <div className="sm:hidden">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50"></div>
          <div className="fixed inset-y-0 right-0 max-w-xs w-3/5 bg-gray-800 z-50">
            <div className="flex items-center justify-end p-4">
              <button
                onClick={toggleMenu}
                className="text-gray-400 hover:text-white focus:outline-none focus:text-white p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="py-8">
              <Link
                to="/home"
                className="block text-white hover:bg-gray-900 py-3 px-5 mx-4 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/SearchRide"
                className="block text-white hover:bg-gray-900 py-3 px-5 mx-4 rounded-md"
              >
                Search Ride
              </Link>
              <Link
                to="/CreateRide"
                className="block text-white hover:bg-gray-900 py-3 px-5 mx-4 rounded-md"
              >
                Create Ride
              </Link>
              <Link
                to="/Rides"
                className="block text-white hover:bg-gray-900 py-3 px-5 mx-4 rounded-md"
              >
                Rides
              </Link>
              <Link
                to="/DriverPortal"
                className="block text-white hover:bg-gray-900 py-3 px-5 mx-4 rounded-md"
              >
                Driver's Portal
              </Link>
              {userLoggedIn ? (
                <button
                  onClick={() => {
                    doSignOut().then(() => {
                      navigate("/login");
                    });
                  }}
                  className="flex text-white w-full justify-center mt-[18rem] hover:bg-gray-900 py-2 px-5 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="flex text-white w-full justify-center mt-[18rem] hover:bg-gray-900 py-3 px-5 mx-4 rounded-md"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
