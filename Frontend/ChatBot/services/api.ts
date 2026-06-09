import axios from "axios";
import { Resource} from "../types/resource";

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchResources = async (topic: string, language: string): Promise<Resource[]> => {
    const response = await axios.post(`${API_BASE_URL}/resources/`, {
        topic,
        language
    });
    return response.data.resources;
}