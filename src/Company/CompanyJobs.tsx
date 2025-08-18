import { useEffect, useState } from "react";
import JobCard from "../FindJobs/JobCard";
import { useParams } from "react-router-dom";
import { getAllJobs } from "../Services/JobService";
import { Skeleton } from "@mantine/core";

const CompanyJobs = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [, setJobs] = useState([{}]);
  const [same, setSame] = useState([{}]);
  useEffect(() => {
    setLoading(true);
    getAllJobs().then((res: any) => {
      setJobs(res);
      const sameJobs = res.filter(
        (job: any) => job.postedBy == id && job.status === "active"
      );
      setSame(sameJobs);
      setLoading(false);
    });
  }, [id]);
  return (
    <div className="mt-10 flex flex-wrap gap-5">
      {loading ? (
        <div className="font-semibold flex flex-wrap gap-5 sm-mx:flex-wrap sm-mx:gap-3">
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
        </div>
      ) : (
        same.length > 0 ? same.map((job: any, index: any) => <JobCard key={index} {...job} />) : <div className="font-semibold text-xl">No active jobs found</div>
      )}
    </div>
  );
};

export default CompanyJobs;
