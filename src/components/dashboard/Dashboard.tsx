import { NavLink, Outlet } from "react-router";


const Dashboard = () => {
    return (
        <div className="w-full gap-5 flex flex-col">
            <div className="w-full flex flex-col items-center gap-2">

                <h1 className="text-xl">Dashboard</h1>

                <nav className="flex justify-center gap-4">
                    <NavLink
                        to="/dashboard/installation"
                        className="px-3 py-1 border border-green-500 hover:bg-green-600"
                    >
                        Installation
                    </NavLink>

                    <NavLink
                        to="/dashboard/dismantle"
                        className="px-3 py-1 border border-green-500 hover:bg-green-600"
                    >
                        Dismantle
                    </NavLink>
                </nav>
                <Outlet />
            </div>
         
        </div>
    );
};

export default Dashboard;
