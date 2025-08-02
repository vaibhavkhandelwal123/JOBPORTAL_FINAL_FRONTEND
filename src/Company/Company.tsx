import { Avatar, Divider, Tabs } from "@mantine/core";
import {  MapPin } from "lucide-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";
import React from "react";

const Company = (props: any) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-3/4">
      <div className="relative">
        <img
          className="rounded-t-2xl h-250 object-cover w-full"
          src="/profile banner/banner.jpg"
        />
        <img
          className="h-36 w-36 absolute border-mine-shaft-950 border-8 -bottom-10 left-5 p-2  rounded-3xl bg-mine-shaft-950"
          src="/Google.png"
        />
      </div>
      <div className="">
        <div
          className={`text-3xl font-semibold flex justify-between items-center ${
            window.innerWidth < 768 ? "mt-16" : "mt-20"
          }`}
        >
          Google
          <Avatar.Group>
            <Avatar src="avatar-7.png" />
            <Avatar src="avatar-8.png" />
            <Avatar src="avatar-9.png" />
            <Avatar>+10k</Avatar>
          </Avatar.Group>
        </div>
        
        <div className="flex gap-1 items-center text-mine-shaft-300 text-lg">
          <MapPin className=" h-5 w-5 stroke={1.5}" />
          New York, United States
        </div>
        <Divider my="xl" size="sm" />
        <div>
        <Tabs variant="outline" radius="lg" defaultValue="about">
          <Tabs.List className="[&_button]:text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400 mb-5">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
            <Tabs.Tab value="employees">Employees</Tabs.Tab>
          </Tabs.List>

      <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
      <Tabs.Panel value="jobs"><CompanyJobs/></Tabs.Panel>
      <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
    </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Company;
