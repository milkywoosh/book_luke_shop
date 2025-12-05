import { NavLink } from "react-router";


const NavBar = () => {

    return (
        <nav className="flex flex-col sm:flex-row gap-5 sm:gap-10 items-start sm:items-center text-green-500 text-center border border-green-500 px-3 py-3">

            <NavLink to="/home" className=" w-25 sm:w-40 px-3 hover:bg-green-600 ">
                Home
            </NavLink>
            <NavLink to="dashboard" className=" w-25 sm:w-40  px-3 hover:bg-green-600 ">
                Dashboard
            </NavLink>
            <NavLink to="product" className="w-25 sm:w-40 px-3 hover:bg-green-600 ">
                Product
            </NavLink>
            <NavLink to="random" className="w-25 sm:w-40 px-3 hover:bg-green-600 ">
                Random
            </NavLink>
            <NavLink to="about" className="w-25 sm:w-40 px-3 hover:bg-green-600">
                About
            </NavLink>
        </nav>
    );
}

export default NavBar;