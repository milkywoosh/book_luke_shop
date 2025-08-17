import { Link } from 'react-router-dom'
import styles from './MealDataTableAggrid.module.css'
import { useEffect, useState } from 'react'
import { data_table_meals } from '../../data_sourcing_api/data_apil_all'
import axios from 'axios'
import ErrorPopUp, { type ErrorPopUpMsg } from '../error/error_popup/ErrorPopUp'

import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
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

const MealDataTableAggridTheme = themeQuartz.withParams({
    backgroundColor: 'rgba(255, 255, 255, 1)',
    foregroundColor: 'rgba(255, 255, 255, 1)',
    headerTextColor: 'rgba(255, 255, 255, 1)',
    headerBackgroundColor: 'rgba(72, 69, 71, 1)',
    headerColumnResizeHandleColor: 'rgba(255, 255, 255, 1)',
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
})
const MealDataTableAggrid = ({ data_source }: { data_source: data_meal_datatable[] }) => {



    function closePopUp() {
        setError(false);
        setPopUp(false);
    }

    function HandleClickMealRow(params: any) {
        console.log("check params: ", params.data)
        return (
            <Link
                to={`/meal-detail/${params.data.id}`}
            />

        );
    }


    // note: ColDef => Column Definition, wrapping for data_meal_datatable
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<ColDef<data_meal_datatable>[]>([
        {
            field: "name",
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return (
                    <Link
                        to={`/meal-detail/${params.data.id}`}
                        style={{
                            color: '#ffffffff',
                            cursor: 'pointer'
                        }}
                    >
                        {params.data.name}
                    </Link>
                );
            }
        },
        {
            field: "price",
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return (
                    <Link
                        to={`/meal-detail/${params.data.id}`}
                        style={{
                            color: '#ffffffff',
                            cursor: 'pointer'
                        }}
                    >
                        {params.data.price}
                    </Link>
                );
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

    return (
        // Data Grid will fill the size of the parent container
        <div

            style={{ height: 300, width: 600 }}>
            <AgGridReact
                theme={MealDataTableAggridTheme}
                rowData={mealDataTable}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onRowClicked={HandleClickMealRow}


            />
        </div>
    )

}

export default MealDataTableAggrid