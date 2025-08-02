import { Button, Divider, Text } from "@mantine/core";
import { Bookmark, BookMarkedIcon, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const JobCard = (props:any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state:any) => state.profile);
  const handleSaveJob = () => {
    let savedJobs: any = [...(profile.savedJobs ?? [])];
    if (savedJobs?.includes(props.id)) {
      savedJobs = savedJobs?.filter((jobId:any) => jobId !== props.id);
    } else {
      savedJobs=[...savedJobs, props.id];
    }
    let updatedProfile = {
      ...profile,
      savedJobs: savedJobs,
    }
    dispatch(changeProfile(updatedProfile));
  }
  return (
    <div className="bg-mine-shaft-900 p-4 w-72 sm-mx:w-full flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/Logos/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs">{props.company} &#x2022; {props.applicants?props.applicants.length:0} Applicants</div>
          </div>
        </div>
        <div>
          {profile.savedJobs?.includes(props.id)?
            <BookMarkedIcon onClick={handleSaveJob} size={20}  className="cursor-pointer text-bright-sun-400" />
          :
            <Bookmark onClick={handleSaveJob} size={20}  className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />
          }
        </div>
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:px-2 [&>div]:py-1 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg [&>div]:text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <Text
        lineClamp={2}
        className="!text-xs text-justify !text-mine-shaft-300"
      >
        {props.about}
      </Text>
      <Divider size="xs" className="my-2" color="mine-shaft.7" />
      <div className="flex justify-between items-center">
        <div className="font-semibold text-mine-shaft-200">&#8377;{props.packageOffered} LPA</div>
        <div className="flex gap-1 items-center text-mine-shaft-400 text-xs">
          <Clock className=" h-5 w-5" />
          Posted {timeAgo(props.postTime)}
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth className="to-bright-sun-400" variant="outline">View Job</Button>
      </Link>
    </div>

  );
};

export default JobCard;
