import { Divider } from "@mantine/core";
import Profile from "../Profile/Profile";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const profile = useSelector((state: any) => state.profile);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4 overflow-hidden">
      <Divider mx='md' mb='xl'/>
      <Profile {...profile} />
    </div>
  );
};

export default ProfilePage;
