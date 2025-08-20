import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import styles from './DetailOfPackage.module.css';
import ErrorPopUp from "../error/error_popup/ErrorPopUp";


import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import type { ColDef } from "ag-grid-community";
import { base_url_dev } from "../../backend_api/base_url";
ModuleRegistry.registerModules([AllCommunityModule]);

type details_of_package = {
    id: number;
    list_item: string;
}


const DetailsOfPackageTheme = themeQuartz.withParams({
    backgroundColor: 'rgba(255, 255, 255, 1)',
    foregroundColor: 'rgba(255, 255, 255, 1)',
    headerTextColor: 'rgba(255, 255, 255, 1)',
    headerBackgroundColor: 'rgba(72, 69, 71, 1)',
    headerColumnResizeHandleColor: 'rgba(255, 255, 255, 1)',
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
})

const DetailsOfPackage = () => {

    function closePopUp(): void {
        setError(false);
        setPopUp(false);
    }
    // function HandleClickPackageRow(params: any) {
    //     console.log('params detail pacakge: ', params)
    //     return (
    //         <Link
    //             to={`/package-type/detail/${params.data.id}`}
    //         />
    //     )
    // }

    const defaultColDef: ColDef = {
        flex: 1,
    };

    const [colDefs, setColDefs] = useState<ColDef<details_of_package>[]>([
        {
            field: "list_item",
            headerName: "List Item",
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return (
                    <Link
                        to={`/package-type/detail/${params.data.id}`}
                        style={{
                            color: '#ffffffff',
                            cursor: 'pointer'
                        }}
                    >
                        {params.data.list_item}
                    </Link>
                )
            }

        },
    ])

    const [detailPackage, setDetailPackage] = useState<details_of_package[]>([]);
    const [error, setError] = useState<Boolean>(false);
    const [popUp, setPopUp] = useState<Boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const { id } = useParams<{ id: string }>();

    useEffect(() => {

        const fetchDataDetailOfPackage = async () => {
            axios.get(`${base_url_dev}/package-type/detail/${id}`).then((res) => {
                console.log("rruuuu: ", res.data.body)
                setDetailPackage(res.data.body)
                setError(false);
                setPopUp(false);
            })
                .catch((err) => {
                    console.log("eerrr: ", err)

                    setError(true)
                    setPopUp(true)

                    if (axios.isAxiosError(err)) {
                        if (err.code === "ERR_NETWORK") {
                            setDetailPackage([]);
                            setErrorMsg(`Gangguan koneksi pada server. Silahkan coba lagi`);
                        } else {
                            setDetailPackage([]);
                            const backendMsg = err.response?.data;
                            setErrorMsg(backendMsg?.message);
                        }
                    } else {
                        setErrorMsg(`Something went wrong`);
                        setDetailPackage([]);
                    }

                })
        }

        fetchDataDetailOfPackage()
    }, [error, popUp])


    if (error && popUp) {
        return (
            <div className={styles.container}>
                <ErrorPopUp
                    error={{ message: errorMsg, data: null }}
                    onClose={closePopUp}
                />
            </div>
        )
    }

    return (
        <div
            style={{ height: 300, width: 600 }}
        >
            <AgGridReact
                theme={DetailsOfPackageTheme}
                rowData={detailPackage}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                
            />
        </div>
    )
}

export default DetailsOfPackage;