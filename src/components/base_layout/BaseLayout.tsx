import "../../index.css"; // note: wajib import!
import NavBar from "../nav_bar/NavBar";

const BaseLayout = ({ children }: any) => {
    return (

        <div className=" flex flex-row sm:flex-col  min-h-screen w-screen bg-black">
            {/* <header className="px-3 py-3">========== App Header ==========</header> */}
            {/* <div className="flex flex-row sm:w-full bg-black sm:sticky sm:top-0">
                <div className="items-center hidden sm:block px-3 py-3 text-center text-green-500 border border-green-500 ">
                    <span>XCMT</span>
                </div>
                <NavBar />
            </div> */}
            <main className="flex flex-1 w-full flex-col sm:flex-row sm:justify-center  text-green-500">
                {children}
            </main>
            {/* <footer className="px-3 py-3">========== App Footer ==========</footer> */}
        </div>

    )
}

export default BaseLayout;