import api from "../api";

export const findUserHistory = async () => {
    const response = await api.get(`/cep-history`);
    
    return response.data.content;
};