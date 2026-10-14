
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const todoService = {
    getAll: async () => {
        const response = await api.get("");
        return response.data;
    },

    create: async (todo) => {
        const response = await api.post("", todo);
        return response.data;
    },

    update: async (id, todo) => {
        const response = await api.put(`/${id}`, todo);
        return response.data;
    },

    delete: async (id) => {
        await api.delete(`/${id}`);
    },
};

export default todoService;
