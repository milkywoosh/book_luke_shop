import "../../index.css"; // note: wajib import!

const BaseLayout = ({ children }: any) => {
    return (
        // <div className="bg-black min-h-screen flex flex-col">
        // <div className="min-h-screen flex flex-col items-center bg-black justify-center text-green-500 border-2 border-green-500">
        <div className="min-h-screen flex flex-col items-center bg-black justify-center text-green-500 border-2 border-green-500">
            <header className="mb-3">========== App Header ==========</header>
            <main className="mb-3">{children}</main>
            <footer className="mb-3">========== App Footer ==========</footer>
        </div>
    )
}

export default BaseLayout;