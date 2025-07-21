import { useState } from "react"
import styles from "./EntryNewMeal.module.css";
import axios from "axios";
import { base_url_dev } from "../../backend_api/base_url";
import ErrorPopUp from "../error/error_popup/ErrorPopUp";


const EntryNewMeal = () => {

    // page proccessing
    const [popUp, setPopUp] = useState<Boolean>(false)


    // api data
    const [name, setName] = useState<string>("")
    const [info, setInfo] = useState<string>("")
    const [nutritionFact, setNutritionFact] = useState<string>("")

    const [error, setError] = useState<Boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [errorData, setErrorData] = useState<any>(null)


    // post API
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const post_data = {
            name: name,
            info: info,
            nutrition_facts: nutritionFact
        }

        // how to handle error? => show error to pop up

        axios.post(`${base_url_dev}/meal-product/create`, {
            ...post_data
        })
            .then((res) => {
                setName("")
                setInfo("")
                setNutritionFact("")
                console.log("ressss: ", res)
            })
            .catch((err) => {
                setName("")
                setInfo("")
                setNutritionFact("")
                setPopUp(true)

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
                    error={{ message: errorMsg, data: errorData }}
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
                    <label> Enter Nutrition Fact :
                        <input
                            placeholder="nutrition fact?"
                            type="text"
                            value={nutritionFact}
                            onChange={(e) => setNutritionFact(e.target.value)}
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