import { Button, Divider } from "@mantine/core"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Profile from "../TalentProfile/Profile"
import RecommendTalent from "../TalentProfile/RecommendTalent"

const TalentProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Divider size="xs"/>
        
          <Button leftSection={<ArrowLeft size={20}/>} my="sm" onClick={()=>navigate(-1)} color="bright-sun.5" variant="light">Back</Button>
      
        <div className="flex gap-5 lg-mx:flex-wrap">
            <Profile/>
            <RecommendTalent/>
        </div>
    </div>
  )
}

export default TalentProfile