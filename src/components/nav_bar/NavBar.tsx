import { useState } from "react";
import { NavLink } from "react-router";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border sm:w-full border-green-500 gap-6 py-3 px-3 flex flex-col sm:flex sm:flex-row sm:items-center">
      {/* Top row: logo/title + hamburger button */}


      <div className="flex px-1 flex-col items-center">

        {/* Hamburger button: visible on small screens only */}
        <button
          className="sm:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className="h-0.5 w-6 bg-green-500" />
          <span className="h-0.5 w-6 bg-green-500" />
          <span className="h-0.5 w-6 bg-green-500" />
        </button>
      </div>


      {/* Links */}
      <div
        className={`
          flex flex-col gap-2 text-green-500 text-left sm:text-center
          sm:mt-0 sm:flex-row sm:gap-10 sm:flex-1 sm:items-center
          ${open ? "block" : "hidden"} sm:flex
        `}
      >
        <NavLink to="/home" className=" flex-1 w-20 sm:w-20  hover:bg-green-600">
          Home
        </NavLink>
        <NavLink to="dashboard" className=" flex-1 w-20 sm:w-20  hover:bg-green-600">
          Dashboard
        </NavLink>
        <NavLink to="product" className=" flex-1 w-20 sm:w-20  hover:bg-green-600">
          Product
        </NavLink>
        <NavLink to="random" className=" flex-1 w-20 sm:w-20  hover:bg-green-600">
          Random
        </NavLink>
        <NavLink to="about" className=" flex-1 w-20 sm:w-20  hover:bg-green-600">
          About
        </NavLink>



      </div>


    </nav>
  );
};

export default NavBar;