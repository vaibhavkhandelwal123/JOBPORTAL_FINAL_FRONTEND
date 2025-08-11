import axiosInstance from "../Interceptor/AxiosInterceptor";
const getProfile=async (id:any)=>{
        return axiosInstance.get(`/profiles/get/${id}`)
        .then(result => result.data)
        .catch(error => {
            throw error;
        });  
}
const updateProfile=async (profile:any)=>{
        return axiosInstance.put(`/profiles/update`, profile)
        .then(result => result.data)
        .catch(error => {
            throw error;
        });  
}
const getAllProfiles=async ()=>{
    return axiosInstance.get(`/profiles/getAll`)
    .then(result => result.data)
    .catch(error => {
        throw error;
    });
}
const uploadResume=async(resume:any)=>{
    return axiosInstance.post(`/profiles/resume`,resume)
    .then(result => result.data)
    .catch(error => {
        throw error;
    })
}

const getResume=async (id:any)=>{
    return axiosInstance.get(`/profiles/resume/${id}`)
    .then(result => result.data)
    .catch(error => {
        throw error;
    });
}

const deleteResume=async (id:any)=>{
    return axiosInstance.delete(`/profiles/resume/${id}`)
    .then(result => result.data)
    .catch(error => {
        throw error;
    });
}
export {getProfile,updateProfile,getAllProfiles,uploadResume,getResume,deleteResume};