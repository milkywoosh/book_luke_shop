import "../../index.css"; // note: wajib import!
import NavBar from "../nav_bar/NavBar";

const BaseLayout = ({ children }: any) => {
    return (

        <div className="border border-green-500 flex flex-row sm:flex-col gap-1 min-h-screen min-w-screen bg-black">
            {/* <header className="px-3 py-3">========== App Header ==========</header> */}
            <NavBar />
            <main className="flex flex-col sm:flex-row  justify-center  text-green-500">
                {children}
            </main>
            {/* <footer className="px-3 py-3">========== App Footer ==========</footer> */}
        </div>

    )
}

export default BaseLayout;