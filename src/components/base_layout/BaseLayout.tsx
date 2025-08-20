import {  useNavigate } from "react-router-dom";
import data_naming from "../../data_sourcing_api/data_naming";
import PageNavigation from "../page_navigation/PageNavigation";

const BaseLayout = ({ children }: any) => {

    const navigate: any = useNavigate();

    return (
        <div className="">
            <PageNavigation />

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
            <br></br>
            <br></br>
            <footer className="">Healthy Food for Lyfe</footer>
        </div>
    )
}

export default BaseLayout;