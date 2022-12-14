import axios from "axios";

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,

    headers: {
        Accept: "application/json",
        "Content-Type": "applicattion/json;",
    },
});


export default http;

