
import styles from './MealDataTable.module.css'

type data_meal_datatable = {
    meal_name: string
    price: number
}


const MealDataTable = ({data_source }: { data_source: data_meal_datatable[] }) => {
    return (
        <div className="flex flex-col items-center">
            {/* create table here */}
            <table className="border-collapse w-1">
                <thead>
                    <tr>
                        <th className="border border-solid border-white p-10 text-center">Meal Name</th>
                        <th className="border border-solid border-white p-10 text-center">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data_source.map((item, index) => (
                        <tr key={index}>
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