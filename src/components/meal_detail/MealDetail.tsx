
import styles from "./MealDetail.module.css"; 
import { useParams } from "react-router-dom";
// import data_meal_details from "../../data_sourcing_example/data_meal_detail"
import axios from "axios";
import { base_url_dev } from "../../backend_api/base_url";
import { useEffect, useState } from "react";
import ErrorPopUp, { type ErrorPopUpMsg } from "../error/error_popup/ErrorPopUp";

type get_detail_result = {
    id: number;
    name: string;
    info: string,
    nutrition_fact: string
}

type ResponseGetDetailMealAPI = {
    data: get_detail_result[]
    err: Boolean
    message: String
}



const MealDetail = () => {

    const [detailResponse, setDetailResponse] = useState<ResponseGetDetailMealAPI>({
        data: [],
        err: false,
        message: ""
    } as ResponseGetDetailMealAPI);

    // const [IDParam, setIDParam] = useState<string | undefined>("")
    const [error, setError] = useState<Boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [popUp, setPopUp] = useState<Boolean>(false);
    const [pic, setPic] = useState<string | undefined>("");


    const { id } = useParams<{ id: string }>();

    useEffect(() => {

        // setIDParam(id)  ?? fetch picture from backend or UI fetch from certain server based on ID?


        if (id == null || id == undefined || id === "") {

            setPopUp(true);
            setErrorMsg("Error id not received");

            setDetailResponse(() => {
                return {
                    data: [],
                    err: true,
                    message: "Error id not received"
                }
            });


        } else {
            // const result = data_meal_details.filter((item) => item.id == id)

            // fetch picture from BACKEND get raw()
            axios.get(`${base_url_dev}/meal-product/picture/${id}`, {
                responseType: 'blob',
            })
                .then((res) => {
                    // fetch id of picture // res.data == picture raw data
                    const imgUrl = URL.createObjectURL(res.data);
                    setPic(imgUrl)
                    // setPic();
                })
                .catch((err) => {
                    console.log("err fetch pic: ", err)
                })



            // change to fetch by ID by API backend
            axios.get(`${base_url_dev}/meal-product/meal/${id}`)
                .then((res) => {
                    // console.log("res.data: ", res.data.body)


                    setDetailResponse({
                        data: res.data.body,
                        err: false,
                        message: res.data.message
                    });
                })
                .catch((err) => {

                    console.log("id null")
                    setPopUp(true);
                    setError(true);
                    if (axios.isAxiosError(err)) {

                        if (err.code === "ERR_NETWORK") {
                            setErrorMsg(`Gangguan pada server. Silahkan coba lagi`);
                            setDetailResponse({
                                data: [],
                                err: true,
                                message: `Gangguan koneksi pada server. Silahkan coba lagi`
                            });
                            return;
                        } else {
                            const backendMsg = err.response?.data;
                            setErrorMsg(backendMsg?.message);

                            return
                        }
                    } else {
                        setErrorMsg("Something went wrong");
                        setDetailResponse({
                            data: [],
                            err: true,
                            message: `Something went wrong 1`
                        });
                        return
                    }
                })
            return
        }
    }, [id])

    // if (!id) {
    //     return <div>Error id not received</div>
    // }

    // fetch data source filter by ID?

    // const id_param: number = parseInt(IDParam)

    function closePopUp() {
        setPopUp(false);
        setErrorMsg("");
    }

    if (error && popUp) {
        return <ErrorPopUp
            error={{ message: `${errorMsg}`, data: null } as ErrorPopUpMsg}
            onClose={closePopUp} // as void
        />
    }

    return (
        <div>
            {
                detailResponse.data.map((item) => {
                    return (
                        <li key={item.id}>
                            <div>
                                <h1>{item.name}</h1>
                                <img className={styles.photo} src={pic} alt={item.name} />
                                <h2> {item.info}</h2>
                                <p>{item.nutrition_fact}</p>
                            </div>
                        </li>
                    )
                })
            }
        </div>
    )
}

export default MealDetail;