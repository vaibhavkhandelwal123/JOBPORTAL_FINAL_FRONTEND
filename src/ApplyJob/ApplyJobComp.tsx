import {
  Divider,
  
} from "@mantine/core";

import { timeAgo } from "../Services/Utilities";
import ApplicationForm from "./ApplicationForm";

const ApplyJobComp = (props:any) => {
  
  
  return (
    <>
      <div className="w-2/3 bs-mx:w-4/5 sm-mx:w-full mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="p-3 bg-mine-shaft-800 rounded-xl shrink-0">
              <img className="h-14 w-14 xs-mx:h-8 xs-mx:w-8" src={`/Logos/${props.company}.png`} alt="" />
            </div>
            <div>
              <div className="font-semibold text-2xl xs-mx:text-xl">
                {props.jobTitle}
              </div>
              <div className="text-lg text-mine-shaft-300 flex flex-wrap xs-mx:text-base gap-1">
                <span> {props.company} &#x2022; Posted</span><span>{timeAgo(props.postTime)}</span>&#x2022;<span>{props.applicants?props.applicants.length:0} Applicants</span>
              </div>
            </div>
          </div>
        </div>
        <Divider my="xl" />
        <ApplicationForm/>
      </div>
    </>
  );
};

export default ApplyJobComp;
