import { Divider } from "@mantine/core";
import Profile from "../Profile/Profile";
import { useSelector } from "react-redux";
import CompanyProfile from "../CompanyProfile/CompanyProfile";

const ProfilePage = () => {
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  return (
    <div className="min-h-[90vh] md-mx:w-full bg-mine-shaft-950 font-['poppins'] md:px-4 overflow-hidden">
      <Divider mx='md' mb='xl'/>
      {user.accountType === "EMPLOYER" ? (<CompanyProfile {...profile} />) :
      <Profile {...profile} />
}
    </div>
  );
};

export default ProfilePage;
