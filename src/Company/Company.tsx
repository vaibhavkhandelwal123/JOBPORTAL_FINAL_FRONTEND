import { Avatar, Divider, Tabs } from "@mantine/core";
import {  MapPin } from "lucide-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";
import React from "react";

const Company = (props:any) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="w-3/4 md-mx:w-full">
      <div className="relative">
        <img
          className="rounded-t-2xl h-250 object-cover w-full"
          src="/profile banner/banner.jpg"
        />
        <img
          className="h-36 w-36 md-mx:h-32 md-mx:w-32 sm-mx:h-28 sm-mx:w-28 xs-mx:h-24 xs-mx:w-24 xsm-mx:h-20 xsm-mx:w-20 absolute border-mine-shaft-950 border-8 -bottom-10 left-5 p-2  rounded-3xl bg-mine-shaft-950"
          src={ props.pictures
                  ? `data:image/png;base64,${props.pictures}`
                  : `/${props.name}.png`}
        />
      </div>
      <div className="">
        <div
          className={`text-3xl xs-mx:text-xl font-semibold flex justify-between items-center ${
            window.innerWidth < 768 ? "mt-16" : "mt-20"
          }`}
        >
          {props.name}
          <Avatar.Group>
            <Avatar src="avatar-7.png" />
            <Avatar src="avatar-8.png" />
            <Avatar src="avatar-9.png" />
            <Avatar>{props.size > 100 && props.size <= 1000 ? `+100` : props.size > 1000 && props.size < 9999 ? `+1k` : props.size >= 9999 && `+10k`}</Avatar>
          </Avatar.Group>
        </div>
        
        <div className="flex gap-1 xs-mx:text-md items-center text-mine-shaft-300 text-lg">
          <MapPin className=" h-5 w-5 stroke={1.5}" />
         {props.headQuarters}
        </div>
        <Divider my="xl" size="sm" />
        <div>
        <Tabs variant="outline" radius="lg" defaultValue="about">
          <Tabs.List className="[&_button]:text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400 mb-5">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
            <Tabs.Tab value="employees">Employees</Tabs.Tab>
          </Tabs.List>

      <Tabs.Panel value="about"><AboutComp {...props}/></Tabs.Panel>
      <Tabs.Panel value="jobs"><CompanyJobs/></Tabs.Panel>
      <Tabs.Panel value="employees"><CompanyEmployees {...props}/></Tabs.Panel>
    </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Company;
