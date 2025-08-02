import { Text, Divider, Button } from "@mantine/core";
import { Clock, Bookmark, CalendarDaysIcon, BookMarkedIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {formatInterviewTime, timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";

const Card = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  
  const [interviewTime, setInterviewTime] = useState("");
useEffect(() => {
  if (props.interviewing && props.applicants?.length && profile?.id) {
    const matchedApplicant = props.applicants.find(
      (appli: any) => appli.applicantId === profile.id
    );
    
    if (matchedApplicant) {
      setInterviewTime(matchedApplicant.interviewTime);
    }
  }
}, [props.interviewing, props.applicants, profile.id]);


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
    <div className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/Logos/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs">
              {props.company} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
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
      <div className="flex gap-2 [&>div]:px-2 [&>div]:py-1 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg [&>div]:text-xs">
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
        <div className="font-semibold text-mine-shaft-200">
          &#8377;{props.packageOffered} LPA
        </div>
        <div className="flex gap-1 items-center text-mine-shaft-400 text-xs">
          <Clock className=" h-5 w-5" />
          {props.applied || props.interviewing
            ? "Applied"
            : props.offered
            ? "Interviewed"
            : "Posted"}{" "}
          {timeAgo(props.postTime)}
        </div>
      </div>
      {(props.offered || props.interviewing) && (
        <Divider size="xs" color="mine-shaft.7" />
      )}
      {props.offered && (
        <div className="flex gap-2">
          <Button color="bright-sun.5" variant="outline" fullWidth>
            Accept
          </Button>
          <Button color="bright-sun.5" variant="light" fullWidth>
            Reject
          </Button>
        </div>
      )}
     
{props.interviewing && (
        <div className="flex text-sm gap-1 items-center">
          <CalendarDaysIcon className="text-bright-sun-400 w-5 h-5" />
          {formatInterviewTime(interviewTime)}
        </div>
      )}


      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth className="to-bright-sun-400" variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
};

export default Card;
