import data_naming from "../../data_sourcing_api/data_naming";

const BaseLayout = ({children}: any) => {
    return (
        // <div className="bg-black min-h-screen flex flex-col">
        <div className="flex flex-col">
            <header className="">================================================= App Header =================================================</header>
             <h1>{data_naming.title_base_layout}</h1>

            <p className="">
                {data_naming.wording_base_layout1}
            </p>
            <p className="">
                {data_naming.wording_base_layout2}
            </p>
            <br></br>  {/* need to adjust space vertically */}
            <br></br>
            <main className="">{children}</main>
            <br></br>
            <footer className="">================================================= App Footer =================================================</footer>
        </div>
    )
}

export default BaseLayout;