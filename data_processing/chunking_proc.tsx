function chunk_arr_of_obj (arr_of_obj: {name: string}[], size: number): {name: string}[][] {
    const arr_result: {name: string}[][] = [];
    for (let i = 0; i < arr_of_obj.length; i += size) {
        arr_result.push(arr_of_obj.slice(i, i + size))
    }

    return arr_result;
}

export {
    chunk_arr_of_obj,
}