import { useParams } from "react-router-dom";
import data_meal_details from "../../data_sourcing_example/data_meal_detail"

type get_detail_result = {
    id: number;
    meal_name: string;
    intro: string,
    nutrition_fact: string
}

function GetDetailByID(id: number): get_detail_result[] {
    if (id == null) {
        return []
    } else {
        const result = data_meal_details.filter((item) => item.id == id)
        return result
    }
}

const MealDetail = () => {

    const { id } = useParams()
    
    if (!id) {
        return <div>Error id not received</div>
    }


    // fetch data source filter by ID?

    const id_param: number = parseInt(id)
    
    const detail = GetDetailByID(id_param)

    return (
        <div>
            {
                detail.map((item: get_detail_result) => {
                    return (
                        <div>
                            <h1>{item.meal_name}</h1>
                            <h2> {item.intro}</h2>
                            <p>{item.nutrition_fact}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MealDetail;