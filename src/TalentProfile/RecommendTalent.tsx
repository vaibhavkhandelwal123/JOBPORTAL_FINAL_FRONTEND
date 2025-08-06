import { useEffect, useState } from "react"
import { getAllProfiles } from "../Services/ProfileService";
import { useParams } from "react-router-dom";
import NewTalentCard from "../FindTalent/NewTalentCard";
import { Skeleton } from "@mantine/core";

const RecommendTalent = () => {
  const {id}=useParams();
  const [loading, setLoading] = useState(false);
  const [Profiles,setProfiles]=useState<any>([{}]);
  useEffect(()=>{
    setLoading(true);
    window.scrollTo(0, 0);
    getAllProfiles().then((res)=>{
      setProfiles(res)
    }).catch((err)=>{
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  },[])
  return (
    <div>
        <div className="text-xl font-semibold mb-5 text-bright-sun-400">Recommended Talent</div>
    <div className="flex flex-col flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton height={250} width={300} className="!rounded-xl"/>
            <Skeleton height={250} width={300} className="!rounded-xl"/>
            <Skeleton height={250} width={300} className="!rounded-xl"/>
            <Skeleton height={250} width={300} className="!rounded-xl"/>
          </>
        ) : (
          Profiles.map((profile:any,index:any)=>index < 5 && id!=profile.id && <NewTalentCard key={index} {...profile}/>)
        )}
    </div>
    </div>
  )
}

export default RecommendTalent