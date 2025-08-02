import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { DateInput, TimeInput, TimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { CalendarDaysIcon, Heart, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import {
  NotificationError,
  NotificationSuccess,
} from "../SignUpLogin/NotificationAny";
import { formatInterviewTime, openResume } from "../Services/Utilities";

const TalentCard = (props: any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [app,{open:openApp,close:closeApp}]=useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [profile, setProfile] = useState<any>({});
  const [job, setJob] = useState<any>({});
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    if (props.applicantId)
      getProfile(props.applicantId)
        .then((res: any) => {
          setProfile(res);
          if (res && res.length > 0 && Number(id) == 0)
            navigate(`/posted-job/${res[0].id}`);
          setJob(res.find((item: any) => item.id === Number(id)));
        })
        .catch((err: any) => {
          console.error("Error fetching profile:", err);
        });
    else setProfile(props);
  }, []);
  const handleOffer = (status: string) => {
  if (status === "INTERVIEWING" && (!date || !time)) {
    NotificationError("Error", "Please select both date and time.");
    return;
  }

  setLoading(true);

  let interview: any = {
    id,
    applicantId: profile.id,
    applicationStatus: status,
  };

  if (status === "INTERVIEWING") {
    const [timePart, period] = time.split(" ");
    const [rawHour, rawMin] = timePart.split(":").map(Number);
    let hour = rawHour;
    if (period === "PM" && rawHour !== 12) hour += 12;
    if (period === "AM" && rawHour === 12) hour = 0;

    const minutes = rawMin;

    const interviewDate = new Date(date);
    interviewDate.setHours(hour);
    interviewDate.setMinutes(minutes);
    interviewDate.setSeconds(0);
    interviewDate.setMilliseconds(0);

    interview = {
      ...interview,
      interviewTime: interviewDate.toISOString(),
    };

    console.log("Scheduled Interview:", interview);
  }
  changeAppStatus(interview)
    .then((res: any) => {
      if (status === "INTERVIEWING")
        NotificationSuccess("Interview Scheduled", "Interview scheduled successfully");
      else if (status === "OFFERED")
        NotificationSuccess("Offered", "Offer has been sent successfully");
      else
        NotificationSuccess("Rejected", "Applicant has been rejected");

      setLoading(false);
      window.location.reload();
    })
    .catch((err: any) => {
      setLoading(false);
      NotificationError("Error", "Failed to schedule interview. Please try again later.");
    });
};

  return (
    <div className="bg-mine-shaft-900 p-4 w-96 bs-mx:w-[50%] md-mx:w-full flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              size="lg"
              src={
                profile?.pictures
                  ? `data:image/png;base64,${profile?.pictures}`
                  : "/avatar-7.png"
              }
              alt=""
            />
          </div>
          <div>
            <div className="font-semibold text-lg">{profile.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {profile?.jobTitle} &bull; {profile?.company}
            </div>
          </div>
        </div>
        <div>
          <Heart size={20} className="text-mine-shaft-300 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:px-2 [&>div]:py-1 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg [&>div]:text-xs">
        {profile?.skills?.map((skill: any, index: any) =>
          index < 4 ? <div key={index}>{skill}</div> : null
        )}
      </div>
      <div>
        <Text
          lineClamp={2}
          className="!text-xs text-justify !text-mine-shaft-300"
        >
          {profile?.about}
        </Text>
      </div>
      <Divider color="mine-shaft.5" />
      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <CalendarDaysIcon /> Interview:{" "}
          {props.interviewTime
            ? formatInterviewTime(props.interviewTime)
            : "Not scheduled"}
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="font-semibold text-mine-shaft-200">23 LPA</div>
          <div className="flex gap-1 items-center text-mine-shaft-400 text-xs">
            <MapPin className=" h-5 w-5" />
            {profile?.location}
          </div>
        </div>
      )}
      
      {props.invited ? (
        <>
        <Divider color="mine-shaft.5" />
        <div>
          <div className="flex [&>*]:w-1/2 [&>*]:p-1 gap-2">
            <Button onClick={()=>handleOffer("OFFERED")} loading={loading} color="bright-sun.5" variant="outline" fullWidth>
              Accept
            </Button>
            <Button onClick={()=>handleOffer("REJECTED")} loading={loading} color="bright-sun.5" variant="light" fullWidth>
              Reject
            </Button>
          </div>
        </div>
        </>
      ) : (
        <div>
          <div className="flex [&>*]:w-1/2 [&>*]:p-1">
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="bright-sun.5" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<CalendarDaysIcon className="w-5 h-5" />}
                  color="bright-sun.5"
                  variant="light"
                  fullWidth
                  
                >
                  Schedule
                </Button>
              ) : (
                <Button color="bright-sun.5" variant="light" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {(props.invited ||
        props.posted )&&
          <Button onClick={openApp} color="bright-sun.4" variant="light" fullWidth>
            View Application
          </Button>
        }
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            minDate={new Date()}
            onChange={(value) => setDate(value ? new Date(value) : null)}
            label="Date"
            placeholder="Enter Date"
          />
          <TimePicker
            label="Time"
            withDropdown
            format="12h"
            value={time}
            onChange={setTime}
          />
          <Button
            onClick={() => {
              handleOffer("INTERVIEWING");
            }}
            color="bright-sun.5"
            variant="light"
            loading={loading}
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal
        opened={app}
        onClose={closeApp}
        title="Application"
        centered
      >
        <div className="flex flex-col gap-4">
          <div>
            Email: &emsp;<a className="text-bright-sun-400 hover:underline cursor-pointer text-center" href={`mailto:${props.email}`}>{props.email}</a>
          </div>
          <div>
            Website: &emsp;<a target="_blank" className="text-bright-sun-400 hover:underline cursor-pointer text-center" href={props.website}>{props.website}</a>
          </div>
          <div>
            Resume: &emsp;<span onClick={()=>openResume(props.resume)} className="text-bright-sun-400 hover:underline cursor-pointer text-center" >{props.name}</span>
          </div>
          <div>
            CoverLetter: &emsp;<div className="" >{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
