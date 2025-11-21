import { NavLink } from "react-router";


const NavBar = () => {

    return (
        <nav className="flex flex-row items items-center text-center border border-green-500 px-3 py-3 my-3">
            <NavLink to="/home" className="border border-green-500 px-3 mx-3 hover:bg-green-600 active:bg-green-800">
                Home
            </NavLink>
            <NavLink to="dashboard" className="border border-green-500 px-3 mx-3 hover:bg-green-600 ">
                Dashboard
            </NavLink>
            <NavLink to="product" className="border border-green-500 px-3 mx-3 hover:bg-green-600 ">
                Product
            </NavLink>
            <NavLink to="random" className="border border-green-500 px-3 mx-3 hover:bg-green-600 ">
                Random
            </NavLink>
            <NavLink to="about" className="border border-green-500 px-3 mx-3 hover:bg-green-600">
                About
            </NavLink>
        </nav>
    );
}

export default NavBar;