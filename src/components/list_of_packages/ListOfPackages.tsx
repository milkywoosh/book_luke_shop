
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { list_of_packages_api } from "../../data_sourcing_api/data_api_all";
import ErrorPopUp, { type ErrorPopUpMsg } from "../error/error_popup/ErrorPopUp";

import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

type ListOfPackagesProps = {
    name: string
}


const ListOfPackagesAggridTheme = themeQuartz.withParams({
    backgroundColor: 'rgba(255, 255, 255, 1)',
    foregroundColor: 'rgba(255, 255, 255, 1)',
    headerTextColor: 'rgba(255, 255, 255, 1)',
    headerBackgroundColor: 'rgba(72, 69, 71, 1)',
    headerColumnResizeHandleColor: 'rgba(255, 255, 255, 1)',
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
})

const ListOfPackages = () => {

    const [listOfPackages, setListOfPackages] = useState([]);
    const [error, setError] = useState<boolean>(false);
    const [popUp, setPopUp] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    function closePopUp() {
        setError(false);
        setPopUp(false);
    }

    const [colDefs, setColDefs] = useState<ColDef<ListOfPackagesProps>[]>([
        {
            field: "name",
            headerName: "Package Name",
            cellStyle: { textAlign: 'center' },
            headerClass: "ag-center-header",
            cellRenderer: (params: any) => {
                return (
                    <Link
                        to={`/package-type/detail/${params.data.id}`}
                        style={{
                            color: '#ffffffff',
                            cursor: 'pointer'
                        }}
                    >
                        {params.data.name}
                    </Link>
                );
            }


        }
    ])

    useEffect(() => {

        const fetchData = async () => {

            axios.get(list_of_packages_api)
                .then((res) => {
                    console.log('list of package: ', res.data.body)
                    setListOfPackages(res.data.body);
                })
                .catch((err) => {

                    setError(true);
                    setPopUp(true);


                    if (axios.isAxiosError(err)) {

                        if (err.code === "ERR_NETWORK") {
                            setListOfPackages([]);
                            setErrorMsg(`Gangguan koneksi pada server. Silahkan coba lagi`);
                        }
                        else if (err.code === "ERR_BAD_REQUEST") {
                            setListOfPackages([]);
                            setErrorMsg(`API tidak ditemukan: ${list_of_packages_api}`);
                        }
                        else {
                            setListOfPackages([]);
                            const backendMsg = err.response?.data;
                            setErrorMsg(backendMsg?.message);
                        }
                    } else {
                        setErrorMsg(`Something went wrong ${err}`);
                        setListOfPackages([]);
                        setLoading(false);
                    }



                })
        }

        fetchData();
    }, [])

    if (error && popUp) {
        return (<ErrorPopUp error={{ message: errorMsg, data: null } as ErrorPopUpMsg} onClose={closePopUp} />)
    }

    return (< div style={{ height: 300, width: 600, margin: 'auto' }}>
        <AgGridReact
            theme={ListOfPackagesAggridTheme}
            rowData={listOfPackages}
            columnDefs={colDefs}
            defaultColDef={{
                flex: 1,            // each column takes equal available space
                minWidth: 100,      // prevent too small
                resizable: true,
            }}
            domLayout="autoHeight"
        />
    </div>)
}

export default ListOfPackages;