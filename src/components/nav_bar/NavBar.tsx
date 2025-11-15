

const NavBar = () => {

    return (
        <div className="flex flex-row items items-center text-center border border-green-500 px-3 py-3 ">
            <div className="border border-green-500 px-3 mx-3 hover:bg-green-600 active:bg-green-800">
                Home
            </div>
            <div className="border border-green-500 px-3 mx-3 hover:bg-green-600 ">
                Dashboard
            </div>
            <div className="border border-green-500 px-3 mx-3 hover:bg-green-600">
                About
            </div>
        </div>
    );
}

export default NavBar;