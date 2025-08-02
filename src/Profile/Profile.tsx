import {Avatar, Divider, Overlay} from "@mantine/core";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { Edit2 } from "lucide-react";
import { NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { getBase64 } from "../Services/Utilities";

const Profile = () => {
  const dispatch = useDispatch();
  const user=useSelector((state: any) => state.user);
  const profile = useSelector((state:any)=>state.profile);
  useEffect(()=>{
    getProfile(user.id).then((data:any)=>{
      dispatch(setProfile(data));
    }).catch((error:any)=>{
      console.error(error);
    });
  },[]);
  const {hovered,ref}=useHover();
  const handleFile = async (event:any) => {
    const file = event.target.files && event.target.files[0];
    let pictures: any = await getBase64(file);
    let updatedProfile = { ...profile, pictures: pictures.split(',')[1] };
    dispatch(changeProfile(updatedProfile));
    NotificationSuccess("Success", "Profile Picture Updated Successfully");
  };
  
  return (
    <div className="w-4/5 lg-mx:w-full mx-auto">
      <div className="">
      <div className="relative px-5">
        <img
          className="rounded-t-2xl xs-mx:h-32"
          src="/profile banner/banner.jpg"
        />
        <div ref={ref} className="absolute cursor-pointer flex items-center justify-center !rounded-full -bottom-1/3 md-mx:-bottom-10 sm-mx:-bottom-16  left-8">
          <Avatar
            className="!h-48 !w-48 md-mx:!w-40 md-mx:!h-40  border-mine-shaft-950 border-8 rounded-full sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 xsm-mx:!w-28"
            src={profile.pictures ? `data:image/png;base64,${profile.pictures}` : "/avatar-7.png"}
          />
          {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
          {hovered && <Edit2 className="absolute z-[300] !w-16 !h-16"/>}
          {hovered && <input
            type="file"
            onChange={handleFile}
            style={{
              display: hovered ? "block" : "none",
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
              zIndex: 400,
            }}
            accept="image/png,image/jpeg"
          />}
        </div>
      </div>
      <div className="px-3 pt-2 mt-16">
        <Info/>
        <Divider my="xl" size="sm" />
        <About/>
        <Divider my="xl" size="sm" />
        <Skills/>
        <Divider my="xl" size="sm" />
        <Experience/>
        <Divider my="xl" size="sm" />
        <Certificate/>
      </div>
      </div>
    </div>
  );
};

export default Profile;
