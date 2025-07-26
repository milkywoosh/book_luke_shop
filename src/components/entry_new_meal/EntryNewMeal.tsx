import { useState } from "react"
import styles from "./EntryNewMeal.module.css";
import axios from "axios";
import { base_url_dev } from "../../backend_api/base_url";
import ErrorPopUp, { type ErrorPopUpMsg } from "../error/error_popup/ErrorPopUp";
import SuccessPopUp from "../success/success_popup/SuccessPopUp";


const EntryNewMeal = () => {

    // page proccessing
    const [popUp, setPopUp] = useState<Boolean>(false)


    // api data
    const [name, setName] = useState<string>("")
    const [info, setInfo] = useState<string>("")
    const [nutritionFact, setNutritionFact] = useState<string>("")
    const [currency, setCurrency] = useState<string>("")
    const [price, setPrice] = useState<number>(0)

    const [error, setError] = useState<Boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [errorData, setErrorData] = useState<any>(null)

    const [successNotif, setSuccessNotif] = useState<Boolean>(false)
    const [successMsg, setSuccessMsg] = useState<string>("")
    const [successData, setSuccessData] = useState<any>(null)





    // post API
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const post_data = {
            name: name,
            info: info,
            nutrition_fact: nutritionFact,
            currency: currency,
            price: price,


        }

        // how to handle error? => show error to pop up

        axios.post(`${base_url_dev}/meal-product/create`, {
            ...post_data
        })
            .then((res) => {


                setName("")
                setInfo("")
                setNutritionFact("")
                setCurrency("")
                setPrice(0)

                if (!error) {
                    // set success pop up
                    setSuccessNotif(true)
                    setSuccessMsg(res.data.message)
                }

                setTimeout(() => {
                    setSuccessNotif(false);
                    // setSuccessMsg("");
                }, 2000)


            })
            .catch((err) => {
                setName("")
                setInfo("")
                setNutritionFact("")
                setCurrency("")
                setPrice(0)

                setPopUp(true)
                // handle error catch from API backend
                if (axios.isAxiosError(err)) {
                    // If backend sent a structured error response
                    const backendMessage = err.response?.data;
                    setError(true)
                    setErrorMsg(backendMessage?.message)


                } else {
                    console.error('Unknown error:', err);
                }
            })
    }

    function closePopUp() {
        setPopUp(false)
        setError(false)
        setErrorMsg("")
    }



    // create pop up error page

    if (popUp && error) {
        return (

            <div className={styles.formWrapper}>
                <ErrorPopUp
                    error={{ message: errorMsg, data: errorData } as ErrorPopUpMsg}
                    onClose={closePopUp}
                />
            </div>
        )
    }

    if (successNotif) {
        return (
            <div className={styles.formWrapper}>
                <SuccessPopUp
                    success={{ message: successMsg, data: successData }}
                    onClose={closePopUp}
                />
            </div>
        )
    }

    return (
        <div className={styles.formWrapper}>
            <div>
                <form
                    className={styles.formEntryMeal}
                    onSubmit={handleSubmit}
                >
                    <label> Enter Meal Name :
                        <input
                            placeholder="meal name?"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label> Enter info :
                        <input
                            placeholder="info meal?"
                            type="text"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                        />

                    </label>
                    <label> Enter Nutrition Fact:
                        <input
                            placeholder="nutrition fact?"
                            type="text"
                            value={nutritionFact}
                            onChange={(e) => setNutritionFact(e.target.value)}
                        />

                    </label>
                    <label> Enter Currency ("rupiah", "dollar"):
                        <input
                            placeholder="currency?"
                            type="text"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        />
                    </label>
                    <label> Enter Price:
                        <input
                            placeholder="price?"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                        />
                    </label>

                    <input type="submit" value="submit" />
                </form>
            </div>
            <div>
                <span> Entry Name: {name} </span> <br />
                <span> Entry Info: {info} </span> <br />
                <span> Entry Nutrition Fact: {nutritionFact} </span>
            </div>
        </div>
    )
}

export default EntryNewMeal;