import { Menu, Avatar} from "@mantine/core";
import {
  FileText,
  LogOut,
  MessageCircle,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Slices/UserSlice";
import { setProfile } from "../Slices/ProfileSlice";
import { getCompany } from "../Services/CompanyService";
import { getProfile } from "../Services/ProfileService";

const ProfileHeader = () => {
  const user = useSelector((state:any) => state.user);
  const profile = useSelector((state:any) => state.profile);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      if (user && user.id) {
       if(user.accountType == "EMPLOYER"){
        getCompany(user?.profileId)
          .then((data: any) => {
            dispatch(setProfile(data));
          })
      }
      else{
      getProfile(user?.profileId)
        .then((data: any) => {
          dispatch(setProfile(data));
        })
        .catch((error: any) => {
          console.error(error);
        });
      }
    }
    }, [user, dispatch]);
  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };
  return (
    <Menu shadow="md" width={200} opened={open} onChange={setOpen}>
      <Menu.Target>
        {user.accountType=="APPLICANT"?
        <div className="flex gap-2 items-center cursor-pointer">
          <div className="xs-mx:hidden">{user.name}</div>
          <Avatar src={profile.pictures ? `data:image/png;base64,${profile.pictures}` : "/avatar-7.png"} alt="it's me" />
        </div>:
        <div className="flex gap-2 items-center cursor-pointer">
          <div className="xs-mx:hidden">{user.name}</div>
          <Avatar src={profile?.pictures ? `data:image/png;base64,${profile.pictures}` : `/Logos/${profile?.name}.png`} alt="it's me" />
        </div>
        }
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpen(true)}>
        <Link to="/profile">
          <Menu.Item leftSection={<UserCircle size={14} />}>Profile</Menu.Item>
        </Link>
        <Menu.Item leftSection={<MessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Link to='/resume'>
        <Menu.Item leftSection={<FileText size={14} />}>Resume</Menu.Item>
        </Link>
        <Menu.Divider />

        <Menu.Item
          onClick={handleLogout}
          color="red"
          leftSection={<LogOut size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileHeader;
