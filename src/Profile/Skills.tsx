import { ActionIcon, TagsInput } from "@mantine/core"
import { Check, Edit2, Save, X } from "lucide-react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { useMediaQuery } from "@mantine/hooks";

const Skills = () => {
  
  const matches = useMediaQuery("(min-width: 475px)");
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const [skills, setSkills] = useState<string[]>([]);
    const profile = useSelector((state:any)=>state.profile);
    const handleEdit = () => {
        if(!edit){
            setEdit(true);
            setSkills(profile?.skills);
        }
        else{
            setEdit(false);
            setSkills(profile?.skills);
        }
    }
    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, skills };
        dispatch(changeProfile(updatedProfile));
        NotificationSuccess("Success", "Skills Updated Successfully");
    };
    
  return (
    <div className="">
          <div className="text-2xl font-semibold mb-3 flex justify-between">
            Skills
            <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              size={matches ? "md" : "lg"}
              variant="subtle"
              color={edit?"green.8":"bright-sun.4"}
            >
          <Check className="w-4/5 h-4/5" />
        </ActionIcon>)}
          <ActionIcon
          onClick={handleEdit}
          size={matches ? "md" : "lg"}
          variant="subtle"
          color={edit?"red.8":"bright-sun.4"}
          
        >
          {edit ? <X className="" /> : <Edit2 className="" />}
        </ActionIcon>
        </div>
          </div>
          {edit ? (
            <TagsInput
              placeholder="add skills"
              splitChars={[",", " ", "|"]}
              value={skills}
              onChange={setSkills}
            />
          ) : (
            <div className="flex gap-2 flex-wrap">
              {profile?.skills?.map((skill: any, index: number) => (
                <div
                  className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 gap-1 text-sm font-medium"
                  key={index}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
  )
}

export default Skills