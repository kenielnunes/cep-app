import api from '../api';

export const clearUserHistory = async () => {
    const response = await api.delete(`/cep-history`);
    return response.data;
};
