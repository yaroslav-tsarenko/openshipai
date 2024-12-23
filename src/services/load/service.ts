import axios from 'axios';
import {BACKEND_URL} from "../../constants/constants";

const fetchLoadById = async (loadID:string) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/get-load/${loadID}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default fetchLoadById;