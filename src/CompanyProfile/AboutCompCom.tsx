import { ActionIcon, NumberInput, Textarea } from "@mantine/core";
import { Check, Edit2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateCompany } from "../Services/CompanyService";
import { NotificationError, NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { setProfile } from "../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const AboutCompCom = () => {
  const dispatch = useDispatch();
    const profile = useSelector((state:any)=>state.profile);
    const [website, setWebsite] = useState(profile.website);
    const [size, setSize] = useState(profile.size);
    const [overview, setOverview] = useState(profile.overview);
    const [edit,setEdit] = useState(false);
    const matches = useMediaQuery("(min-width: 768px)");

    const handleSave = () => {
      let updatedProfile = { ...profile, website, size, overview };
      updateCompany(updatedProfile).then(() => {
          dispatch(setProfile(updatedProfile));
          setEdit(false);
          NotificationSuccess("Successfull", "Profile updated successfully");
        }).catch(() => {
            NotificationError("Error", "Profile update failed");
        });
  };
  return (
    <div className="flex mx-5 justify-between gap-1 flex-col">
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
                    <div className="flex w-full md-mx:flex-col md:w-full gap-2">
                  <Textarea
                    value={website}
                    className="w-1/2 md-mx:w-full"
                    autosize
                    maxRows={3}
                    placeholder="Enter company website Link"
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <NumberInput
                    className="w-1/2 md-mx:w-full"
                    value={size}
                    hideControls
                    onChange={(value) => setSize(value)}
                    placeholder="Enter company size"
                   />
                  </div>
                  <Textarea
                    value={overview}
                    autosize
                    maxRows={3}
                    placeholder="Enter company overview"
                    onChange={(e) => setOverview(e.target.value)}
                  />
                  </div>
                </div>
              )}
        {!edit && (
          <>
          <div className="text-3xl md-mx:text-2xl sm-mx:text-xl font-semibold flex text-mine-shaft-200 justify-between"><span>About</span> <div
              className="text-bright-sun-400"
              onClick={() => setEdit(!edit)}
            >
              <Edit2 size={matches ? "32" : "24"}/>
            </div></div>
            <div className="text-lg md-mx:text-lg sm-mx:text-sm text-mine-shaft-200 font-md flex gap-2">Website Link :<Link className="text-bright-sun-400 cursor-pointer hover:underline" to={website}>{website}</Link></div>
            <div className="text-lg md-mx:text-lg sm-mx:text-sm text-mine-shaft-200 font-sm flex gap-2">Company size : {size}</div>
            <div className="text-xl md-mx:text-lg sm-mx:text-sm  text-mine-shaft-300">Overview : {overview}</div>
          </>
        )}

    </div>
  )
}

export default AboutCompCom