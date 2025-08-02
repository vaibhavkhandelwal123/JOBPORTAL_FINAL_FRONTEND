import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";
import { NotificationError } from "../SignUpLogin/NotificationAny";

const JobHistory = () => {
  const profile=useSelector((state: any) => state.profile);
  const user=useSelector((state: any) => state.user);
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);
useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
        setShowList(
          res.filter(
            (job: any) =>
              job.applicants?.filter(
                (applicant: any) =>
                  applicant.applicantId === user.id &&
                  applicant.applicationStatus === "APPLIED"
              ).length > 0
          )
        );
      })
      .catch((err) => {
        NotificationError(
          "Error",
          err?.response?.data?.errorMessage || err.message
        );
      });
  }, []);
  const handleTabChange = (value: string|null) => {
    setActiveTab(value);
    if (value === "SAVED") {
      setShowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)));
    }
    else{
      setShowList(jobList.filter((job:any)=>{
      let found=false;
      job.applicants?.forEach((applicant:any)=>{
        if(applicant.applicantId === user.id && applicant.applicationStatus === value){
          found=true;
        }
      })
      return found;
      }))
  }
}
  return (
    <div className="">
      <div className="text-2xl font-semibold mb-5">Job History</div>
      <div>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="outline"
          radius="lg"
          defaultValue="applied"
        >
          <Tabs.List className="[&_button]:text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400 mb-5 sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base sm-mx:[&_button]:!px-2 xs-mx:[&_button]:!px-2 xs-mx:font-medium xs-mx:[&_button]:!py-1 xsm-mx:[&_button]:!text-sm">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab} className="[&>div]:w-full">
            <div className="mt-10 flex flex-wrap gap-5">
              {showList.map((job: any, index: any) => (
                <Card key={index} {...job} app={job.applicants} {...{[activeTab.toLowerCase()]: true}} />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;
