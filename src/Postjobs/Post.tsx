import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJobData";
import SelectInput from "./SelectInput";
import TestEditor from "./TestEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import { NotificationError, NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useMediaQuery } from "@mantine/hooks";

const Post = () => {
  // const matches = useMediaQuery(`(min-width:350px)`);
  const {id} = useParams();
  const [editData,setEditData]=useState(content);
  const user = useSelector((state:any) => state.user);
  const select = fields;
  useEffect(()=>{
    window.scrollTo(0,0);
    if(id!=="0"){
      getJob(id).then((res)=>{
        form.setValues(res);
        setEditData(res.description);
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      form.reset();
      setEditData(content); 
    }
  },[id])
  const form = useForm({
    mode:'controlled',
    validateInputOnChange: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about:'',
      description:content 
    },
    validate:{
      jobTitle:isNotEmpty("Title is required"),
      company:isNotEmpty("Company name is required"),
      experience:isNotEmpty("Experience is required"),
      jobType:isNotEmpty("Job type is required"),
      location:isNotEmpty("Location is required"),
      packageOffered:isNotEmpty("Package offered is required"),
      skillsRequired:isNotEmpty("Skills required is required"),
      about:isNotEmpty("About is required"),
      description:isNotEmpty("Description is required")
    }
  })
  const navigate = useNavigate();
  const handlePost = () =>{
    form.validate();
    if (!form.isValid()) {
      return;
    }
    const data = {...form.getValues(),id,postedBy:user.id,jobStatus:"ACTIVE"};
    postJob(data).then((res)=>{
      NotificationSuccess("Success", "Job posted successfully");
      navigate(`/posted-job/${res.id}`);
    }).catch((err)=>{
      NotificationError("Error", err.response?.data?.errorMessage || "Failed to post job");
    });
  }
   const handleDraft = () =>{
    const data = {...form.getValues(),id,postedBy:user.id,jobStatus:"DRAFT"};
    postJob(data).then((res)=>{
      NotificationSuccess("Success", "Job saved as draft");
      navigate(`/posted-job/${res.id}`);
    }).catch((err)=>{
      NotificationError("Error", err.response?.data?.errorMessage || "Failed to post job");
    });
  }
  return (
    <div className="px-16 bs-mx:px-10 md-mx:px-5 py-5">
      <div className="text-2xl font-semibold mb-5">Post a Job</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 md-mx:gap-5 sm-mx:[&>*]:w-full sm-mx:flex-wrap [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10 md-mx:gap-5 sm-mx:[&>*]:w-full sm-mx:flex-wrap [&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 md-mx:gap-5 sm-mx:[&>*]:w-full sm-mx:flex-wrap [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput label="Salary (in LPA)"
            placeholder="Enter package offered"
            min={0}
            {...form.getInputProps("packageOffered")}
            max={300}
            name="packageOffered"
            clampBehavior="strict"
            hideControls
            withAsterisk
          />  
        </div>
        <TagsInput
          withAsterisk
          {...form.getInputProps("skillsRequired")}
          label="Skills"
          placeholder="Enter skill"
          acceptValueOnBlur
          clearable
          splitChars={[",", " ", "|"]}
        />
      <Textarea
                  {...form.getInputProps("about")}
                  label="About"
                  withAsterisk
                  autosize
                  {...form.getInputProps("about")}
                  maxRows={3}
                  placeholder="Enter about Job..."
                />
      <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:bg-bright-sun-400/20">
        <div className="text-sm font-medium">Job Description<span className="text-red-500">*</span></div>
        <TestEditor form={form} data={editData}/>
      </div>
      <div className="flex gap-4">
        <Button
          color="bright-sun.5"
          variant="light"
          onClick={handlePost}
        >
          Publish Job
        </Button>
        <Button
          color="bright-sun.5"
          variant="outline"
          onClick={handleDraft}
        >
          Save as Draft
        </Button>
      </div>
    </div>
    </div>
  );
};

export default Post;
