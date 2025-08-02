import { ActionIcon } from "@mantine/core";
import { Trash2 } from "lucide-react";
import { formatData } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { useMediaQuery } from "@mantine/hooks";


const CertCard = (props: any) => {
  const matches = useMediaQuery("(min-width: 475px)");
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const handleDelete = () => {
    let certi = [...profile.certifications];
    certi.splice(props.index, 1);
    let updatedProfile = { ...profile, certifications: certi };
    dispatch(changeProfile(updatedProfile));
    NotificationSuccess("Success", "Certificate Deleted Succssfully");
  };
  return (
    <div className="flex justify-between sm-mx:flex-wrap">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0 ">
          <img className="h-8 w-8" src={`/Logos/${props.issuer}.png`} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold xs-mx:text-sm">{props.title}</div>
          <div className="text-sm xs-mx:text-xs text-mine-shaft-300">{props.issuer}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col items-end sm-mx:items-start sm-mx:flex-row sm-mx:gap-2">
          <div className="text-sm xs-mx:text-xs text-mine-shaft-300">
            {formatData(props.issueDate)}
          </div>
          <div className="text-sm xs-mx:text-xs text-mine-shaft-300">
            ID: {props.certificateId}
          </div>
        {props.edit && (
          <ActionIcon
            onClick={handleDelete}
            size={matches ? "md" : "lg"}
            variant="subtle"
            color="red.8"
          >
            <Trash2 className="sm-mx:mb-4" size={20}/>
          </ActionIcon>
        )}
        </div>


      </div>
    </div>
  );
};

export default CertCard;
