import { useState } from "react"
import styles from "./EntryNewMeal.module.css";


const EntryNewMeal = () => {

    // insert new meal API POST /create 
    // request body

    const [name, setName] = useState<string>("")
    const [info, setInfo] = useState<string>("")
    const [nutritionFact, setNutritionFact] = useState<string>("")

    return (
        <div >
            <form className={styles.form}>
                <label> Enter Meal Name :
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span> Entry: {name} </span>
                </label>
                <label> Enter info :
                    <input
                        type="text"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                    <span> Entry: {info} </span>

                </label>
                <label> Enter Nutrition Fact :
                    <input
                        type="text"
                        value={nutritionFact}
                        onChange={(e) => setNutritionFact(e.target.value)}
                    />
                    <span> Entry: {nutritionFact} </span>
                </label>

                <input type="submit" value="submit"  />
            </form>
        </div>
    )
}

export default EntryNewMeal;