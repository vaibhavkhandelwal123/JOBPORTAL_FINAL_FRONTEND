import { Avatar, Divider, Overlay } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeProfile, setProfile } from "../Slices/ProfileSlice";
import { useHover, useMediaQuery } from "@mantine/hooks";
import { Edit2 } from "lucide-react";
import { NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { getBase64 } from "../Services/Utilities";
import { getCompany } from "../Services/CompanyService";
import Mainly from "./Mainly";
import AboutCompCom from "./AboutCompCom";
import Specialities from "./Specialities";

const CompanyProfile = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  useEffect(() => {
    getCompany(user.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);
  const { hovered, ref } = useHover();
  const handleFile = async (event:any) => {
    const file = event.target.files && event.target.files[0];
    let pictures: any = await getBase64(file);
    let updatedProfile = { ...profile, pictures: pictures.split(",")[1] };
    dispatch(changeProfile(updatedProfile));
    NotificationSuccess("Success", "Profile Picture Updated Successfully");
  };

  return (
    <div className="w-4/5 md-mx:w-full lg:mx-auto">
      <div className="">
        <div className="relative px-5">
          <img
        style={{ width: "100%", height: matches ? "250px" : "150px", objectFit: "cover" }}
            className="rounded-t-2xl xs-mx:h-32"
            src="/profile banner/bg.webp"
          />
          <div
            ref={ref}
            className="absolute cursor-pointer flex items-center justify-center !rounded-full -bottom-1/3 md-mx:-bottom-10 sm-mx:-bottom-16  left-8"
          >
            <Avatar
              className="!h-48 !w-48 md-mx:!w-40 md-mx:!h-40 bg-mine-shaft-900  border-mine-shaft-950 border-8 rounded-full sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 xsm-mx:!w-28"
              src={
                profile.pictures
                  ? `data:image/png;base64,${profile.pictures}`
                  : `/Logos/${profile?.name}.png`
              }
            />
            {hovered && (
              <>
                <Overlay
                  className="!rounded-full"
                  color="#000"
                  backgroundOpacity={0.75}
                />
                <Edit2 className="absolute z-[300] !w-16 !h-16" />
              </>
            )}
            <input
              type="file"
              onChange={handleFile}
              className="absolute w-full h-full opacity-0 cursor-pointer z-[400]"
              accept="image/png,image/jpeg"
            />
          </div>
        </div>
        <div className="px-3 pt-2 mt-16">
          <Mainly/>
          <Divider className="my-5" />
          <AboutCompCom/>
          <Divider className="my-5" />
          <Specialities/>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
