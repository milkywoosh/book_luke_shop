import { Link, useNavigate } from 'react-router-dom'
import styles from './MealDataTableAggrid.module.css'
import { useEffect, useState } from 'react'
import data_table_meals from '../../data_sourcing_api/data_datatable'
import axios from 'axios'
import ErrorPopUp, { type ErrorPopUpMsg } from '../error/error_popup/ErrorPopUp'

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import type { ColDef } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);


type data_meal_datatable = {
    id: number,
    name: string
    price: number
}

const defaultColDef: ColDef = {
    flex: 1,
};
// how to make a cell is click-able and go to another page?

const MealDataTableAggrid = ({ data_source }: { data_source: data_meal_datatable[] }) => {
    const navigate = useNavigate();

    function HandleClickMealDetail(id: number) {
        // go to this route, which is defined in App.tsx
        navigate(`/meal-detail/${id}`);
    }

    function closePopUp() {
        setError(false);
        setPopUp(false);
    }



    // note: ColDef => Column Definition, wrapping for data_meal_datatable
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<ColDef<data_meal_datatable>[]>([
        {
            field: "id",
            cellStyle: { textAlign: 'left' },
            // tooltipValueGetter: params => {
            //     // return `Full name: ${params.value}`;
            //     console.log(params.value)
            // },
            cellRenderer: (params: any) => {
                return (
                    <Link
                        to={`/meal-detail/${params.value}`}
                        style={{
                            color: '#272b57ff',
                            // textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                    >
                        {params.value}
                    </Link>
                );
            }


        },
        {
            field: "name",
            cellStyle: { textAlign: 'left' },
            tooltipValueGetter: params => {
                return `Full name: ${params.value}`;
            }
        },
        {
            field: "price",
            cellStyle: { textAlign: 'left' },
            tooltipValueGetter: params => {
                return `Full name: ${params.value}`;
            }
        },
    ]);


    const [mealDataTable, setMealDataTable] = useState<data_meal_datatable[]>([
        // { id: 1, name: "Tesla", price: 64950 },
        // { id: 2, name: "Ford", price: 33850 },
        // { id: 3, name: "Toyota", price: 29600 },
    ])

    const [loading, setLoading] = useState<Boolean>(true)
    const [error, setError] = useState<Boolean>(false);
    const [popUp, setPopUp] = useState<Boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            // const result = await GetAxios(data_table_meals)

            axios.get(data_table_meals)
                .then((res) => {
                    console.log("res 1")
                    console.log("res 2", res.data.body)
                    setError(false);
                    setPopUp(false);
                    setMealDataTable(res.data.body);

                })
                .catch((err) => {
                    setError(true);
                    setPopUp(true);

                    if (axios.isAxiosError(err)) {
                        console.log("err 3")
                        if (err.code === "ERR_NETWORK") {
                            setMealDataTable([]);
                            setErrorMsg(`Gangguan koneksi pada server. Silahkan coba lagi`);
                        } else {
                            setMealDataTable([]);
                            const backendMsg = err.response?.data;
                            setErrorMsg(backendMsg?.message);
                        }

                    } else {

                        setErrorMsg(`Something went wrong`);
                        setMealDataTable([]);
                        setLoading(false);
                    }

                })

            setLoading(false)
        }
        fetchData()

    }, [error, popUp])

    if (loading) {
        return (
            <div className={styles.container}>
                <p>.................</p>;
            </div>
        )
    }

    if (error && popUp) {
        return (<div className={styles.container}>
            <ErrorPopUp
                error={{ message: errorMsg, data: null } as ErrorPopUpMsg}
                onClose={closePopUp}
            />
        </div>)
    }

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
        // Data Grid will fill the size of the parent container
        <div style={{ height: 800, width: 1000 }}>
            <AgGridReact
                rowData={mealDataTable}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}


            />
        </div>
    )

}

export default MealDataTableAggrid