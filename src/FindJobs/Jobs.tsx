
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Jobs = () => {
  const dispatch = useDispatch();
 const [jobList, setJobList] = useState([{}]);
   const filter = useSelector((state: any) => state.filter);
   const [filtered, setFiltered] = useState([{}]);
   const sort = useSelector((state:any)=>state.sort);
 useEffect(()=>{
dispatch(resetFilter());
dispatch(resetSort());
  getAllJobs().then((res) => {
      setJobList(res.filter((job:any)=>job.jobStatus=="ACTIVE"));
    }).catch((error) => {
      console.log("Failed to fetch jobs", error);
    })
 },[]);

 useEffect(()=>{
  if(sort=="Most Recent"){
    setJobList([...jobList].sort((a:any,b:any)=>new Date(b.postTime).getTime()-new Date(a.postTime).getTime()));
  }
  else if(sort=="Salary: Low to High"){
    setJobList([...jobList].sort((a:any,b:any)=>a.packageOffered-b.packageOffered));
  }
  else if(sort=="Salary: High to Low"){
    setJobList([...jobList].sort((a:any,b:any)=>b.packageOffered-a.packageOffered));
  }
  
 },[sort])
  useEffect(() => {
     let filterjob = jobList;
     
     if (filter["Job Title"] && filter["Job Title"].length > 0) {
       filterjob = filterjob.filter((job: any) =>
         filter["Job Title"]?.some((title: any) =>
           job.jobTitle.toLowerCase().includes(title.toLowerCase())
         )
       );
     }
     if (filter.Location && filter.Location.length > 0) {
       filterjob = filterjob.filter((job: any) =>
         filter.Location?.some((location: any) =>
           job.location.toLowerCase().includes(location.toLowerCase())
         )
       );
     }
     if(filter.Experience && filter.Experience.length>0){
      filterjob=filtered.filter((job:any)=>filter.Experience?.some((x:any)=>job.experience?.toLowerCase().includes(x.toLowerCase())));
     }
     if (filter["Job Type"] && filter["Job Type"].length > 0) {
       filterjob = filterjob.filter((job: any) =>
         filter["Job Type"]?.some((type: any) =>
           job.jobType.toLowerCase().includes(type.toLowerCase())
         )
       );
     }
     if(filter.salary && filter.salary.length>0){
       filterjob = filterjob.filter((job:any)=>filter.salary[0]<=job.packageOffered && job.packageOffered<=filter.salary[1]);
     }
     setFiltered(filterjob);
   }, [filter, jobList]);

  return (
    <div className="p-5 py-5">
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-2xl xs-mx:text-xl font-semibold">Recommanded Jobs</div>
        <Sort sort="job"/>
      </div>
      <div className="mt-10 flex flex-wrap gap-5">
       {filtered.length?filtered.map((job:any, index:any) => (
        <JobCard key={index} {...job} />
      )):<div className="text-xl font-semibold">No Jobs Found</div>}
      </div>
    </div>
  );
};

export default Jobs;
