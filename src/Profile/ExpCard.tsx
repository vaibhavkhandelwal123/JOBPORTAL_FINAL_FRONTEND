import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatData } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { useMediaQuery } from "@mantine/hooks";

const ExpCard = (props: any) => {
  
  const matches = useMediaQuery("(min-width: 475px)");
  const [edit,setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state:any)=>state.profile);
  const handleDelete=()=>{
    let exp = [...profile.experiences];
    exp.splice(props.index,1);
    let updatedProfile = {...profile,experiences:exp};
    dispatch(changeProfile(updatedProfile));
    NotificationSuccess("Success","Experiece Deleted Succssfully");
  }
  return !edit?(
    <div className="flex flex-col gap-2">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
            <img
              className="h-8 w-8"
              src={`/Logos/${props.company}.png`}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &#x2022; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          {formatData(props.startDate)} - {props.working?"Present":formatData(props.endDate)}
        </div>
      </div>
      <div className="text-sm xs-mx:text-xs text-justify text-mine-shaft-300">
        {props.description}
      </div>
      {props.edit &&<div className="flex gap-5 xs:w-2/5">
        <Button onClick={()=>setEdit(true)} color="bright-sun.4" variant="outline" fullWidth>
          Edit
        </Button>
        <Button onClick={handleDelete} color="red.8" variant="light" fullWidth>
          Delete
        </Button>
      </div>}
    </div>
  ):<ExpInput {...props} setEdit={setEdit} />
}

export default ExpCard;
