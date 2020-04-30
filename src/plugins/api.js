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
    async updTasks(tasks) {
        return await axios.post("/updTasks", {
            tasks: tasks
        }).then(response => {
            return response.data;
        });
    },
    async updDone(doneTasks) {
        return await axios.post("/updDone", {
            done: doneTasks
        }).then(response => {
            return response.data;
        });
    }

};

export default api;
