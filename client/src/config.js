import axios from "axios";
export const axiosIntance = axios.create({
    baseURL: "http://localhost:8000/api",
});
// export const axiosIntance = axios.create({
//     baseURL: "https://socialguruji.herokuapp.com/api/",
// });