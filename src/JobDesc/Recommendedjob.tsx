import { useEffect, useState } from "react";
import JobCard from "../FindJobs/JobCard"
import { useParams } from "react-router-dom";
import { getAllJobs } from "../Services/JobService";
import { Skeleton } from "@mantine/core";

const Recommendedjob = () => {
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState([{}]);
   useEffect(()=>{
    setLoading(true);
    getAllJobs().then((res) => {
        setJobList(res);
      }).catch((error) => {
        console.log("Failed to fetch jobs", error);
      }).finally(() => {
        setLoading(false);
      });
   },[]);
  const {id}= useParams();
  return (
    <div>
        <div className="text-xl font-semibold mb-5 text-bright-sun-400">Recommended Jobs</div>
    <div className="flex bs:flex-col bs-mx:justify-start flex-wrap justify-between gap-5">
        {
          loading ? <div className="font-semibold flex-col flex gap-5 sm-mx:flex-wrap sm-mx:gap-3">
            <Skeleton height={250} width={300} className="!rounded-xl"/>
            <Skeleton height={250} width={300} className="!rounded-xl"/>
            <Skeleton height={250} width={300} className="!rounded-xl"/>
            <Skeleton height={250} width={300} className="!rounded-xl"/>
          </div>
        :jobList?.map((job: any, index: number) => index < 5 && id!=job.id && <JobCard key={index} {...job} />)}
    </div>
    </div>
  )
}

export default Recommendedjob