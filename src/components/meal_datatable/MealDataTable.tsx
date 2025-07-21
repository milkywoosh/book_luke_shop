import { useNavigate, type NavigateFunction } from 'react-router-dom'
import styles from './MealDataTable.module.css'
import { useEffect, useState } from 'react'
import { GetAxios } from '../../backend_api/fetch_axios'
import data_table_meals from '../../data_sourcing_api/data_datatable'

type data_meal_datatable = {
    id: number,
    name: string
    price: number
}


// how to make a cell is click-able and go to another page?

const MealDataTable = ({ data_source }: { data_source: data_meal_datatable[] }) => {
    const navigate = useNavigate();

    function HandleClickMealDetail(id: number) {
        // go to this route, which is defined in App.tsx
        navigate(`/meal-detail/${id}`);
    }


    const [mealDataTable, setMealDataTable] = useState<data_meal_datatable[]>([])
    const [loading, setLoading] = useState<Boolean>(true)
    const [error, setError] = useState<any>("")

    useEffect(() => {
        const fetchData = async () => {

            try {
                const result = await GetAxios(data_table_meals)
                if (result.status !== 200) throw new Error(result.data.message)

                setMealDataTable(result.data.body)
                setError(false)
                setLoading(false)
            } catch (err) {
                setMealDataTable([])
                setError(err)
                setLoading(false)
            }
        }

        fetchData()

    }, [])

    if (loading) return (
        <div className={styles.container}>
            <p>.................</p>;
        </div>
    )
    if (error) return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Meal Name</th>
                        <th className={styles.th}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {mealDataTable.map((item, index) => (
                        <tr
                            key={index}
                            onClick={() => HandleClickMealDetail(item.id)}
                            className={styles.tr}
                        >
                            <td className={styles.td}>{item.name}</td>
                            <td className={styles.td}>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )

    return (
        <div className={styles.container}>
            {/* create table here */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Meal Name</th>
                        <th className={styles.th}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {mealDataTable.map((item, index) => (
                        <tr
                            key={index}
                            onClick={() => HandleClickMealDetail(item.id)}
                            className={styles.tr}
                        >
                            <td className={styles.td}>{item.name}</td>
                            <td className={styles.td}>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default MealDataTable