import { Indicator, Menu, Notification as Noti, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useSelector } from "react-redux";
import { Check } from "lucide-react";
import { getNotification, readNotification } from "../Services/NotiService";
import { useNavigate } from "react-router-dom";
const Notification = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const unread = (index: number) => {
    let notis = [...notifications];
    notis = notis.filter((noti: any, i: number) => i != index);
    setNotifications(notis);
    readNotification(
      notifications[index].id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    
  };
  useEffect(() => {
    getNotification(user.id)
      .then((res) => {
        setNotifications(res);
      })
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <Menu shadow="md" width={400} opened={open} onChange={setOpen}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 rounded-full p-1.5">
          <Indicator color="bright-sun.4" size={8} disabled={notifications.length<=0} offset={6} processing>
            <NotificationsNoneIcon />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpen(true)}>
        <div className="flex flex-col gap-1">
          {notifications.map((noti: any, index: number) => (
            <Noti
            onClick={()=>{
              navigate(noti.route);
              setOpen(false);
              unread(index)
            }}
            key={index}
              className="hover:bg-mine-shaft-900 cursor-pointer"
              icon={<Check size={20} />}
              color="teal"
              title={noti.action}
              mt="md"
              onClose={() => unread(index)}
            >
              {noti.message}
            </Noti>
          ))}
          {notifications.length == 0 && (
            <div className="text-center text-mine-shaft-300">
              No Notifications
            </div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Notification;
