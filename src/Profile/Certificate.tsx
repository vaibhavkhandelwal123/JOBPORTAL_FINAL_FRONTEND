import { ActionIcon } from "@mantine/core"
import { Edit2, Plus, X } from "lucide-react"
import CertiInput from "./CertiInput"
import CertCard from "./CertCard"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useMediaQuery } from "@mantine/hooks"

const Certificate = () => {
  
  const matches = useMediaQuery("(min-width: 475px)");
  const [edit,setEdit]=useState(false);
  const [certi,setCerti]=useState(false);
  const handleEdit=()=>{
    setEdit(!edit);
  }
  const profile = useSelector((state:any)=>state.profile);
  return (
    <div>
              <div className="text-2xl font-semibold mb-5 flex justify-between">
                Certifications
                <div className="flex gap-2">
    
                <ActionIcon
                    onClick={() => setCerti(true)}
                    size={matches ? "md" : "lg"}
                    variant="subtle"
                    color="bright-sun.4"
                  >
                    <Plus className="" size="large" />
                  </ActionIcon>
                <ActionIcon
                  onClick={handleEdit}
                    size={matches ? "md" : "lg"}
                  variant="subtle"
                  color={edit?"red.8":"bright-sun.4"}
                >
                  {edit? <X className="" /> : <Edit2 className="" />}
                </ActionIcon>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {profile?.certifications?.map((cert: any, index: any) => (
                 <CertCard index={index} key={index} {...cert} edit={edit}/>
                ))}
                {certi&&<CertiInput setEdit={setCerti}/>}
              </div>
            </div>
  )
}

export default Certificate