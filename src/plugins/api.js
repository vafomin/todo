import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000";

const api = {
    async auth(email, password) {
        return await axios.post("/auth", {
            email: email,
            password: password
        }).then(response => {
            return response.data.user;
        });
    }
};

export default api;
