import { Button, Divider } from "@mantine/core"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import JobDesc from "../JobDesc/JobDesc"
import Recommendedjob from "../JobDesc/Recommendedjob"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"

const JobDescPage = () => {
  const {id} = useParams();
  const [job,setJob] = useState<any>(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
    getJob(id).then((res) => {
      setJob(res);
    }).catch((error) => {
      console.error("Failed to fetch job details", error);
    })
  },[id]);
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        
        <Link className="my-4 inline-block" to="/find-jobs">
          <Button leftSection={<ArrowLeft size={20}/>} color="bright-sun.5" variant="light">Back</Button>
        </Link>
        <div className="flex gap-5 justify-around bs-mx:flex-wrap">
            <JobDesc {...job}/>
            <Recommendedjob/>
        </div>
    </div>
  )
}

export default JobDescPage