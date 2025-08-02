import { ActionIcon, Button, Divider } from "@mantine/core";
import { Bookmark, BookMarkedIcon} from "lucide-react";
import { Link } from "react-router-dom";
import { card} from "../Data/JobDescData";
import DomPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { postJob } from "../Services/JobService";
import { NotificationError, NotificationSuccess } from "../SignUpLogin/NotificationAny";
const JobDesc = (props:any) => {
  const profile = useSelector((state:any) => state.profile);
  const description = DomPurify.sanitize(props.description);
  const skillsRequired = props.skillsRequired ?? [];
  const dispatch = useDispatch();
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

    const handleCloseButton=()=>{
      postJob({...props,jobStatus:"CLOSED"}).then((res)=>{
        NotificationSuccess("Success","Job Closed Successfully");
      }).catch((err)=>{
        NotificationError("Error",err.response.data.errorMessage);
      })
    }
  return (
    <div className="w-2/3 bs-mx:w-full ">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-2 sm-mx:gap-5">
          <div className="p-3 bg-mine-shaft-800 rounded-xl shrink-0">
            <img className="h-14 w-14 xs-mx:h-10 xs-mx:w-10" src={`/Logos/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold text-2xl sm-mx:text-xl xs-mx:text-lg">
              {props.jobTitle}
            </div>
            <div className="text-lg text-mine-shaft-300 flex xs-mx:flex-wrap sm-mx:text-base">
            <span>{props.company}</span>
            <span className="mx-2">&#x2022;</span>
            <span>Posted {timeAgo(props.postTime)}</span>
            <span className="mx-2">&#x2022;</span>
            <span>{props.applicants ? props.applicants.length : 0} Applicants</span>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col  gap-2 items-center sm-mx:my-3 sm-mx:w-full sm-mx:[&>button]:w-100px">
          
            {props.jobStatus=="CLOSED" ?
             <Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}><Button color="bright-sun.5" variant="light">
              Re-Open
              </Button>
              </Link>:props.edit ? (
            <Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
              <Button color="bright-sun.5" variant="light">
              Edit
              </Button>
            </Link>
            ) : props.applicants?.some((a: any) => a.applicantId === profile.id) ? (
            <Button color="green.4" variant="light">
              Applied
            </Button>
            ) : (
            <Link to={`/apply-job/${props.id}`}>
              <Button color="bright-sun.5" variant="light">
              Apply Now
              </Button>
            </Link>
            )}

          {props.edit && props.jobStatus!="CLOSED"? <Button onClick={handleCloseButton} color="red.5" variant="outline">
              Close
            </Button>: profile.savedJobs?.includes(props.id)?
            <BookMarkedIcon onClick={handleSaveJob} size={20}  className="cursor-pointer text-bright-sun-400" />
          :
            <Bookmark onClick={handleSaveJob} size={20}  className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />
          }
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex gap-4 justify-between sm-mx:flex-wrap">
        {card.map((item, index) => (
          <div className="flex flex-col gap-1 items-center" key={index}>
            <ActionIcon
              color="bright-sun.4"
              className="!h-12 !w-12 xs-mx:!h-8 xs-mx:!w-8"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="h-4/5 w-4/5" fontSize="large" />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300 xs-mx:text-sm">{item.name}</div>
            <div className="font-semibold text-base xs-mx:text-sm">{props[item.id] ? props[item.id] : "NA"} {item.id=="packageOffered" && props[item.id] ? "LPA" : ""}</div>
          </div>
        ))}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex gap-2 flex-wrap">
          {skillsRequired.map((item: string) => (
            <ActionIcon
              color="bright-sun.4"
              className="!h-fit !w-fit !text-sm font-medium xs-mx:!text-xs"
              variant="light"
              p="xs"
              radius="xl"
              aria-label="Settings"
            >
              {item}
            </ActionIcon>
          ))}
        </div>
      </div>
      <Divider my="xl" />
      <div
        className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&>p]:text-sm [&_li]:text-sm"
        dangerouslySetInnerHTML={{ __html:description }}
      ></div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div>
          <div className="flex justify-between mb-3 xs-mx:flex-wrap xs-mx:gap-2">
            <div className="flex items-center gap-2">
              <div className="p-3 bg-mine-shaft-800 rounded-xl">
                <img className="h-8" src={`/Logos/${props.company}.png`} alt="" />
              </div>
              <div className="flex flex-col">
                <div className="font-medium text-lg">{props.company}</div>
                <div className=" text-mine-shaft-300">10k+ Employees</div>
              </div>
              </div>
              <Link to={`/company/${props.company}`}  >
                <Button color="bright-sun.5" variant="light">
                  Company Page
                </Button>
              </Link>
            </div>
            <div className="text-mine-shaft-300 text-justify xs-mx:text-sm">
              {props.about}
            </div>
          </div>
      </div>
    </div>
  );
};

export default JobDesc;
