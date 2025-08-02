import { useEffect, useState } from "react";
import JobCard from "../FindJobs/JobCard"
import { useParams } from "react-router-dom";
import { getAllJobs } from "../Services/JobService";

const Recommendedjob = () => {
  const [jobList, setJobList] = useState([{}]);
   useEffect(()=>{
    getAllJobs().then((res) => {
        setJobList(res);
      }).catch((error) => {
        console.log("Failed to fetch jobs", error);
      })
   },[]);
  const {id}= useParams();
  return (
    <div>
        <div className="text-xl font-semibold mb-5 text-bright-sun-400">Recommended Jobs</div>
    <div className="flex bs:flex-col bs-mx:justify-start flex-wrap justify-between gap-5">
        {jobList?.map((job: any, index: number) => index < 6 && id!=job.id && <JobCard key={index} {...job} />)}
    </div>
    </div>
  )
}

export default Recommendedjob