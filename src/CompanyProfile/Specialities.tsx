import { ActionIcon, TagsInput } from "@mantine/core";
import { Check, Edit2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateCompany } from "../Services/CompanyService";
import { NotificationSuccess, NotificationError } from "../SignUpLogin/NotificationAny";
import { setProfile } from "../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const Specialities = () => {
    const matches = useMediaQuery("(min-width: 768px)");
    const dispatch = useDispatch();
    const profile = useSelector((state:any)=>state.profile);
    const [edit,setEdit] = useState(false);
    const handleEdit = () => {
        if(!edit){
            setEdit(true);
            setSpecialities(profile?.specialties);
        }
        else{
            setEdit(false);
            setSpecialities(profile?.specialties);
        }
    }
    useEffect(() => {
        setSpecialities(profile.specialties);
    }, [profile.specialties]);
    const [specialties, setSpecialities] = useState<string[]>(profile.specialties || []);
    
      const handleSave = () => {
      let updatedProfile = { ...profile, specialties };
      updateCompany(updatedProfile).then(() => {
          dispatch(setProfile(updatedProfile));
          setEdit(false);
          NotificationSuccess("Successfull", "Profile updated successfully");
        }).catch(() => {
            NotificationError("Error", "Profile update failed");
        });
    }
return (
    <div className="mx-5">
            <div className="text-2xl md-mx:text-xl sm-mx:text-lg font-semibold mb-3 flex justify-between">
              Specialities
              <div>
            {edit && (
              <ActionIcon
                onClick={handleSave}
                variant="subtle"
                color={edit?"green.8":"bright-sun.4"}
              >
            <Check className="w-4/5 h-4/5" />
          </ActionIcon>)}
            <ActionIcon
            onClick={handleEdit}
            variant="subtle"
            color={edit?"red.8":"bright-sun.4"}
            
          >
            {edit ? <X className="" /> : <Edit2 size={matches ? "32" : "24"} />}
          </ActionIcon>
          </div>
            </div>
            {edit ? (
              <TagsInput
                placeholder="add specialities"
                splitChars={[",", " ", "|"]}
                value={specialties}
                onChange={(e) => setSpecialities(e)}
              />
            ) : (
              <div className="flex gap-2 flex-wrap">
                {profile?.specialties?.map((skill: any, index: number) => (
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

export default Specialities