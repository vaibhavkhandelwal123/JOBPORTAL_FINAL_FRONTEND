import { ActionIcon, Textarea } from "@mantine/core";
import { Check, Edit2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { useMediaQuery } from "@mantine/hooks";

const About = () => {
  
  const matches = useMediaQuery("(min-width: 475px)");
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState(profile.about);

  useEffect(() => {
    setAbout(profile.about);
  }, [profile.about]);

  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
      setAbout(profile.about);
    }
  };
  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, about };
    dispatch(changeProfile(updatedProfile));
    NotificationSuccess("Success", "About Section Updated Successfully");
  };
  return (
    <div className="flex flex-col justify-between">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              size="lg"
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
      <div className="">
        {edit && (
          <Textarea
            value={about}
            autosize
            maxRows={3}
            placeholder="write about yourself..."
            onChange={(e) => setAbout(e.target.value)}
          />
        )}
          
        {!edit && (
          <div className="text-sm text-mine-shaft-300 text-justify">
            {profile?.about}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
