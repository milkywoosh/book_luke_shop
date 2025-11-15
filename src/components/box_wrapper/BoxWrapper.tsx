import BoxData from "../box/BoxData";

import { chunk_arr_of_obj } from "../../../data_processing/chunking_proc";
import data_animal from "../../data_sourcing_api/data_animal";

const BoxWrapper = () => {

    const chunked_data_animal = chunk_arr_of_obj(data_animal, 5)

    return (
        <div className="flex flex-row">
            {chunked_data_animal.map((e) => {
                return <BoxData data={e} />
            })}
        </div>
    );
}

export default BoxWrapper;