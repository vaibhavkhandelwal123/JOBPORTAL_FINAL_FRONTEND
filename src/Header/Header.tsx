import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { Burger, Button, Drawer } from "@mantine/core";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import Notification from "./Notification";
import { setUser } from "../Slices/UserSlice";
import { jwtDecode } from "jwt-decode";
import { setUpResponseInterceptor } from "../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";
import { X } from "lucide-react";
const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const links = [
    { name: "Find Jobs", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    { name: "Post Job", url: "post-job/0" },
    { name: "Posted Job", url: "posted-job/0" },
    { name: "Job History", url: "job-history" },
  ];
  const token = localStorage.getItem("token") || "";
  useEffect(() => {
    setUpResponseInterceptor(navigate);
  }, [navigate]);
  useEffect(() => {
    if (token != "") {
      if (localStorage.getItem("token") != "") {
        const decoded = jwtDecode(localStorage.getItem("token") || "");
        dispatch(setUser({ ...decoded, email: decoded.sub }));
      }
    }
    if (token && user?.profileId) {
      getProfile(user?.profileId)
        .then((data: any) => {
          dispatch(setProfile(data));
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [token, navigate]);
  const location = useLocation();
  return (
    location.pathname != "/signup" &&
    location.pathname != "/login" &&
    location.pathname != "/forgot" && (
      <div className="text-white flex justify-between items-center px-6 h-20  bg-mine-shaft-950 font-['poppins']">
        <div className="flex items-center gap-2 text-bright-sun-400 ">
          <div className="font-bold text-3xl">
            <Link to="/">
              <CrisisAlertIcon />
            </Link>
          </div>
          <Link
            to="/"
            className="text-2xl xs-mx:hidden font-semibold cursor-pointer"
          >
            TargetJobs
          </Link>
        </div>
        <NavLinks />
        <div className="flex gap-3 items-center">
          {user ? (
            <ProfileHeader />
          ) : (
            <Link to="/login">
              <Button variant="subtle" color="bright-sun.4">
                Login
              </Button>
            </Link>
          )}
          {user ? <Notification /> : <></>}

          <Burger
            className="bs:hidden"
            opened={opened}
            onClick={open}
            aria-label="Toggle navigation"
          />
          <Drawer
            size="xs"
            opened={opened}
            onClose={close}
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            position="right"
            closeButtonProps={{
              icon: <X size={40} />,
            }}
          >
            <div className="flex flex-col gap-6 items-center">
              {links.map((link, index) => (
                <div className={"h-full flex items-center"} key={index}>
                  <Link
                    className="hover:text-bright-sun-400 text-xl"
                    key={index}
                    to={link.url}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </Drawer>
        </div>
      </div>
    )
  );
};

export default Header;
