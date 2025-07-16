import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import data_naming from "../../data_sourcing_api/data_naming";

const BaseLayout = ({ children }: any) => {

    const location: any = useLocation();
    const navigate: any = useNavigate();

    return (
        <div className="">
            <header className="">
                <button onClick={()=> navigate(-1)}> Prev </button>
                <button onClick={()=> navigate(+1)}> Next </button>
            </header>
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
            <footer className="">=================================================  =================================================</footer>
        </div>
    )
}

export default BaseLayout;