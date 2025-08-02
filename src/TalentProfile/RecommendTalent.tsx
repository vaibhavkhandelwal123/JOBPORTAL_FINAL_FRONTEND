import { useEffect, useState } from "react"
import { getAllProfiles } from "../Services/ProfileService";
import { useParams } from "react-router-dom";
import NewTalentCard from "../FindTalent/NewTalentCard";

const RecommendTalent = () => {
  const {id}=useParams();
  const [Profiles,setProfiles]=useState<any>([{}]);
  useEffect(()=>{
    getAllProfiles().then((res)=>{
      setProfiles(res)
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div>
        <div className="text-xl font-semibold mb-5 text-bright-sun-400">Recommended Talent</div>
    <div className="flex flex-col flex-wrap gap-5">
        {Profiles.map((profile:any,index:any)=>index < 5 && id!=profile.id && <NewTalentCard key={index} {...profile}/>)}
    </div>
    </div>
  )
}

export default RecommendTalent