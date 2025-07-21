import axios from 'axios';

export const GetAxios = async (url: string) => {
    const resp = await axios.get(url);
    console.log("reeesp: ", resp)
    console.log("reeesp: ", resp.data)
    console.log("reeesp: ", resp.status)
    console.log("reeesp: ", resp.statusText)

    return resp;
};