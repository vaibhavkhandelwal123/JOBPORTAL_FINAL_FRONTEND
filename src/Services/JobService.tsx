import axiosInstance from "../Interceptor/AxiosInterceptor";
const getJob=async (id:any)=>{
        return axiosInstance.get(`/jobs/get/${id}`)
        .then(result => result.data)
        .catch(error => {
            throw error;
        });  
}
const getAllJobs=async ()=>{
    return axiosInstance.get(`/jobs/getAll`)
    .then(result => result.data)
    .catch(error => {
        throw error;
    });
}

const postJob =async (job:any)=>{
    return axiosInstance.post(`/jobs/post`,job)
    .then(result => result.data)
    .catch(error => {
        throw error;
    });
}

const applyJob = async (jobId:any, applicant:any) => {
    return axiosInstance.post(`/jobs/apply/${jobId}`, applicant)
    .then(result => result.data)
    .catch(error => {
        throw error;
    });
}

const getJobPostedBy = async (userId: any) => {
    return axiosInstance.get(`/jobs/getJobPostedBy/${userId}`)
    .then(result => result.data)
    .catch(error => {
        throw error;
    });
}

const changeAppStatus = async (applicant:any) => {
    return axiosInstance.post(`/jobs/changeAppStatus`, applicant)
    .then(result => result.data)
    .catch(error => {
        throw error;
    });
}

export {getJob,getAllJobs,postJob,applyJob,getJobPostedBy,changeAppStatus};