import "../../index.css"; // note: wajib import!

const BaseLayout = ({ children }: any) => {
    return (
        // <div className="bg-black min-h-screen flex flex-col">
        // <div className="min-h-screen flex flex-col items-center bg-black justify-center text-green-500 border-2 border-green-500">
        <div className="min-h-screen flex flex-col items-center bg-black justify-center text-green-500  border-green-500">
            <header className="px-3 py-3">========== App Header ==========</header>
            <main className="px-3 py-3 items items-center border border-green-500 ">{children}</main>
            <footer className="px-3 py-3">========== App Footer ==========</footer>
        </div>
    )
}

export default BaseLayout;