import axios from "axios";
import { removeUser } from "../Slices/UserSlice";
const base_url = "http://localhost:8080/auth";
const loginUser=async (login:any)=>{
        return await axios.post(`${base_url}/login`,login)
        .then(result => result.data)
        .catch(error => {
            throw error;
        });  
}

const navigateToLogin = (navigate:any) => {
    removeUser();
    localStorage.removeItem("token");
    navigate("/login");
}
export {loginUser,navigateToLogin};