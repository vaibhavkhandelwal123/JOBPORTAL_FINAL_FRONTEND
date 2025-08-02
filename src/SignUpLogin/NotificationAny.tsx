import { Notifications } from "@mantine/notifications";
import { Check, X } from "lucide-react";

const NotificationSuccess = (title:any,message:any) => {
    Notifications.show({
            title: title,
            message: message,
            withCloseButton: true,
            withBorder: true,
            color: "teal",
            className: "!border-green-500",
            icon: <Check size={25} />,
          })
  
}
const NotificationError = (title:any,message:any) => {
    Notifications.show({
            title: title,
            message: message,
            withCloseButton: true,
            withBorder: true,
            color: "red",
            className: "!border-red-500",
            icon: <X size={25} />,
          })
  
}

export { NotificationSuccess, NotificationError };