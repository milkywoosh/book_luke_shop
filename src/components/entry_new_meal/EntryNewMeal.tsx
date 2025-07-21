import { useState } from "react"
import styles from "./EntryNewMeal.module.css";
import axios from "axios";


const EntryNewMeal = () => {

    // insert new meal API POST /create 
    // request body

    const [name, setName] = useState<string>("")
    const [info, setInfo] = useState<string>("")
    const [nutritionFact, setNutritionFact] = useState<string>("")

    // post API
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const post_data = {
            name: name,
            info: info,
            nutrition_fact: nutritionFact
        }

        // how to handle error? => show error to pop up

        axios.post("http://localhost:3000/meal-product/create", {
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
            console.log("errrrrr: ", err)
        })
        
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