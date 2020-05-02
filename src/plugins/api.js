import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000";

const api = {
    async auth(email, password) {
        return await axios.post("/auth", {
            email: email,
            password: password
        }).then(response => {
            return response.data;
        });
    },
    async updTasks(user, tasks) {
        return await axios.post("/updTasks", {
            user: user,
            tasks: tasks
        }).then(response => {
            return response.data;
        });
    },
    async updDone(user, doneTasks) {
        return await axios.post("/updDone", {
            user: user,
            done: doneTasks
        }).then(response => {
            return response.data;
        });
    }
};

export default api;
