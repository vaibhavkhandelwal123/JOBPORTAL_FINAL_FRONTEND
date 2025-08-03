import axios from "axios";
import { removeUser } from "../Slices/UserSlice";
const base_url = "https://jobportal-final-backend-7rka.onrender.com/auth";
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