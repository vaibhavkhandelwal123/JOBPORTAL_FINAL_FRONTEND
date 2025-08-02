import { Button, Divider, Drawer } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobsPage = () => {
  const matches = useMediaQuery("(max-width: 800px)");
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res);
        setJob(res.find((item: any) => item.id == id));
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [id]);
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-5">
      <Divider size="xs" />
      <Button my="xs" size="sm" autoContrast  onClick={open}>
        All Jobs
      </Button>
      <Drawer overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} opened={opened} size="xs" onClose={close} title="All Jobs">
        <PostedJob job={job} jobList={jobList} />
      </Drawer>
      <div className="flex gap-5 justify-around py-5">
        {!matches && <PostedJob job={job} jobList={jobList} />}
        <PostedJobDesc {...job} />
      </div>
    </div>
  );
};

export default PostedJobsPage;
