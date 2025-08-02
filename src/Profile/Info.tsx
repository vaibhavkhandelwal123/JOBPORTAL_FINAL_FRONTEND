import { useState } from "react";
import { fields } from "../Data/ProfileData";
import SelectInput from "./SelectInput";
import { ActionIcon, NumberInput } from "@mantine/core";
import { BriefcaseBusiness, Check, Edit2, MapPin, Save, X } from "lucide-react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { useMediaQuery } from "@mantine/hooks";
const Info = () => {
  const matches = useMediaQuery("(min-width: 475px)");
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state:any)=>state.user);
  const profile = useSelector((state:any)=>state.profile);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    if(!edit){
      setEdit(true);
      form.setValues({jobTitle:profile.jobTitle,company:profile.company,location:profile.location,totalExp:profile.totalExp})
    }
    else{
      setEdit(false);
    }
  };
  const form = useForm({
    mode: 'controlled',
    initialValues: { jobTitle: '', company: '' ,location: '',totalExp: 1},
  })
  const handleSave = () => {
    setEdit(false);
      let updatedProfile={...profile,...form.getValues()};
      dispatch(changeProfile(updatedProfile));
      NotificationSuccess("Success","Profile Updated Successfully")
  }
  return (
    <div className="flex flex-col gap-2">
      <div
        className={
          "text-3xl font-semibold xs-mx:text-2xl flex justify-between items-center mt-5"
        }
      >
        {user.name}{" "}
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
      {edit && (
        <>
          <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:gap-5 xs-mx:flex-wrap">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:gap-5 xs-mx:flex-wrap">
            <SelectInput form={form} name="location" {...select[2]} />
            <NumberInput className="" withAsterisk clampBehavior="strict" hideControls min={1} max={50} label="Experience" {...form.getInputProps('totalExp')}/>
          </div>
        </>
      )}
      {!edit && (
        <div className="">
          <div className="text-xl xs-mx:text-base flex items-center gap-1">
            <BriefcaseBusiness className=" h-5 w-5 stroke={1.5}" />
            {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="flex gap-1 xs-mx:text-base  items-center text-mine-shaft-300 text-lg">
            <MapPin className=" h-5 w-5 stroke={1.5}" />
            {profile.location}
          </div>
          <div className="flex gap-1 xs-mx:text-base  items-center text-mine-shaft-300 text-lg">
            <BriefcaseBusiness className=" h-5 w-5 stroke={1.5}" />
            Experience: {profile.totalExp} Years
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
