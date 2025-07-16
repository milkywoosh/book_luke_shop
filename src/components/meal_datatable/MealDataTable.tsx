import { useNavigate, type NavigateFunction } from 'react-router-dom'
import styles from './MealDataTable.module.css'

type data_meal_datatable = {
    id: number,
    meal_name: string
    price: number
}


// how to make a cell is click-able and go to another page?

const MealDataTable = ({data_source }: { data_source: data_meal_datatable[] }) => {
    const navigate = useNavigate();
    
    function HandleClickMealDetail(id: number) {
        // go to this route, which is defined in App.tsx
        navigate(`/meal-detail/${id}`);
    }
    
    
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
                    {data_source.map((item, index) => (
                        <tr 
                            key={index}
                            onClick={()=> HandleClickMealDetail(item.id)}
                            className={styles.tr}
                        >
                            <td className={styles.td}>{item.meal_name}</td>
                            <td className={styles.td}>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default MealDataTable