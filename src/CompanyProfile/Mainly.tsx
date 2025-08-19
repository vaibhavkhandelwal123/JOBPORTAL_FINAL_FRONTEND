import { ActionIcon, Textarea} from "@mantine/core";
import { BriefcaseBusiness, Check, Edit2, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationError, NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { updateCompany } from "../Services/CompanyService";
import { setProfile } from "../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const mainly = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [name, setName] = useState(profile.name);
  const [headQuarters, setHeadQuarters] = useState(profile.headQuarters);
  const [industry, setIndustry] = useState(profile.industry);
  const [edit, setEdit] = useState(false);
  
  useEffect(() => {
          setHeadQuarters(profile.headQuarters);
          setIndustry(profile.industry);
          setName(profile.name);
      }, [profile.headQuarters, profile.industry, profile.name]);

  const handleSave = () => {
      let updatedProfile = { ...profile, name, headQuarters, industry };
      updateCompany(updatedProfile).then(() => {
          setEdit(false);
          dispatch(setProfile(updatedProfile));
          NotificationSuccess("Successfull", "Profile updated successfully");
        }).catch(() => {
            NotificationError("Error", "Profile update failed");
        });
  };
  return (
    <div className="flex flex-col justify-between mx-5 gap-1">
      {edit && (
        <div>
        <div className="flex justify-end gap-2">
          <ActionIcon
            onClick={handleSave}
            size="lg"
            variant="subtle"
            color={edit ? "green.8" : "bright-sun.4"}
          >
            <Check className="w-4/5 h-4/5" />
          </ActionIcon>
          <ActionIcon
            onClick={() => setEdit(!edit)}
            variant="subtle"
            color={edit ? "red.8" : "bright-sun.4"}
          >
            {edit && <X className="" />}
          </ActionIcon>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex md-mx:flex-col md:w-full gap-2">
          <Textarea
            value={name}
            className="w-1/2 md-mx:w-full"
            autosize
            maxRows={3}
            placeholder="Enter company name"
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            className="w-1/2 md-mx:w-full"
            value={headQuarters}
            autosize
            maxRows={3}
            placeholder="Enter company headquarters"
            onChange={(e) => setHeadQuarters(e.target.value)}
          />
          </div>
          <Textarea
            value={industry}
            autosize
            maxRows={3}
            placeholder="Enter company industry"
            onChange={(e) => setIndustry(e.target.value)}
          />
          </div>
        </div>
      )}
      {!edit && (
        <div>
          <div className="text-3xl md-mx:text-2xl sm-mx:text-xl text-mine-shaft-200 mt-5 justify-between flex font-semibold">
            {name}
            <div
              className="text-bright-sun-400"
              onClick={() => setEdit(!edit)}
            >
              <Edit2 size={matches ? "32" : "24"}/>
            </div>
          </div>
          <div className="text-xl md-mx:text-lg sm-mx:text-md text-mine-shaft-200 font-md flex gap-2">
            <MapPin />
            {headQuarters}
          </div>
          <div className="text-xl md-mx:text-lg sm-mx:text-md text-mine-shaft-200 font-md flex gap-2">
            <BriefcaseBusiness />
            {industry}
          </div>
        </div>
      )}
    </div>
  );
};

export default mainly;
