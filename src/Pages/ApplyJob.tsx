import { Button, Divider } from "@mantine/core"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import ApplyJobComp from "../ApplyJob/ApplyJobComp"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"

const ApplyJob = () => {
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
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
<Divider size="xs"/>
          <Button mb="xs" onClick={() => navigate(-1)} my="md" leftSection={<ArrowLeft size={20}/>} color="bright-sun.5" variant="light">Back</Button>

        <ApplyJobComp {...job}/>
    </div>
  )
}

export default ApplyJob