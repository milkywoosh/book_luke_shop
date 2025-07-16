

const BaseLayout = ({children}: any) => {
    return (
        <div className="">
            <header className="">App Header</header>
             <h1>Vite + React</h1>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <main className="">{children}</main>
            <footer className="">App Footer</footer>
        </div>
    )
}

export default BaseLayout;