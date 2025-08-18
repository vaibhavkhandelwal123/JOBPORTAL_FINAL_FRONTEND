import axiosInstance from "../Interceptor/AxiosInterceptor";

const getCompany=async (id:any)=>{
        return axiosInstance.get(`/company/get/${id}`)
        .then(result => result.data)
        .catch(error => {
            throw error;
        });  
}

const updateCompany=async (company:any)=>{
        return axiosInstance.put(`/company/update`, company)
        .then(result => result.data)
        .catch(error => {
            throw error;
        });  
}

const getAllCompanies=async ()=>{
        return axiosInstance.get(`/company/getAll`)
        .then(result => result.data)
        .catch(error => {
            throw error;
        });  
}

export {getCompany, updateCompany, getAllCompanies};