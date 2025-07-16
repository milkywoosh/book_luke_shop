import styles from './MealDataTable.module.css'

type data_meal_datatable = {
    meal_name: string
    price: number
}


const MealDataTable = ({data_source }: { data_source: data_meal_datatable[] }) => {
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