import { Avatar, Button, Divider } from "@mantine/core";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import ExpCard from "./ExpCard";
import CertCard from "./CertCard";
import { useParams } from "react-router-dom";
import { getProfile } from "../Services/ProfileService";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

const Profile = () => {
  
  const matches = useMediaQuery("(max-width: 475px)");
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile(id)
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="w-2/3 lg-mx:w-full">
      <div className="relative">
        <img
          className="rounded-t-2xl xl-mx:h-40 w-full xs-mx:h-32"
          src="/profile banner/banner.jpg"
        />
        <div className="absolute cursor-pointer flex items-center justify-center !rounded-full -bottom-1/3 md-mx:-bottom-10 sm-mx:-bottom-16  left-8">
          <Avatar
            className="!h-48 !w-48  md-mx:!w-40 md-mx:!h-40  border-mine-shaft-950 border-8 rounded-full sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 xsm-mx:!w-28"
            src={
              profile?.pictures
                ? `data:image/png;base64,${profile?.pictures}`
                : "/avatar-7.png"
            }
          />
        </div>
      </div>
      <div className="px-8 mt-16">
        <div className="text-3xl xs-mx:2xl font-semibold flex justify-between gap-2 ">
          {profile?.name}
          <Button w={120} size={matches ? "sm" : "md"} color="bright-sun.4" variant="light" fullWidth>
            Message
          </Button>
        </div>
        <div className="text-xl flex  xs-mx:text-base items-center gap-1 mt-2">
          <BriefcaseBusiness className=" h-5 w-5 stroke={1.5}" />
          {profile?.jobTitle} &bull; {profile?.company}
        </div>
        <div className="flex xs-mx:text-base mt-1 gap-1 items-center text-mine-shaft-300 text-lg">
          <MapPin className=" h-5 w-5 stroke={1.5}" />
          {profile?.location}
        </div>
        <div className="flex mt-1 gap-1 items-center text-mine-shaft-300 text-lg">
          <BriefcaseBusiness className=" h-5 w-5 stroke={1.5}" />
          Experience: {profile?.totalExp} Years
        </div>
        <Divider my="xl" size="sm" />
        <div className="">
          <div className="text-2xl font-semibold mb-3">About</div>
          <div className="text-sm text-mine-shaft-300 text-justify">
            {profile.about}
          </div>
        </div>
        <Divider my="xl" size="sm" />
        <div className="">
          <div className="text-2xl font-semibold mb-3">Skills</div>
          <div className="flex gap-2 flex-wrap">
            {profile.skills?.map((skill: string) => (
              <div className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 gap-1 text-sm font-medium">
                {skill}
              </div>
            ))}
          </div>
        </div>
        <Divider my="xl" size="sm" />
        <div className="">
          <div className="text-2xl font-semibold mb-5">Experience</div>
          <div className="flex flex-col gap-8">
            {profile.experiences?.map((exp: any, index: any) => (
              <ExpCard key={index} {...exp} />
            ))}
          </div>
        </div>
        <Divider my="xl" size="sm" />
        <div>
          <div className="text-2xl font-semibold mb-5">Certifications</div>
          <div className="flex flex-col gap-8">
            {profile.certifications?.map((cert: any, index: any) => (
              <CertCard key={index} {...cert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
