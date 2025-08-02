import { TextInput, NumberInput, Textarea, Button, FileInput, LoadingOverlay } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Paperclip, ArrowLeft } from 'lucide-react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getBase64 } from '../Services/Utilities';
import { applyJob } from '../Services/JobService';
import { NotificationError, NotificationSuccess } from '../SignUpLogin/NotificationAny';
import { useSelector } from 'react-redux';

const ApplicationForm = () => {
    const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const user = useSelector((state:any) => state.user);
  const navigate = useNavigate();
  const {id}=useParams();
  
  const handleSubmit = async() => {
   setSubmit(true);
   let resume:any = await getBase64(form.getValues().resume);
   let applicant ={...form.getValues(),applicantId:user.id,resume: resume.split(',')[1]};
   applyJob(id, applicant).then((result) => {
      setSubmit(false);
      NotificationSuccess("Success", "Application submitted successfully");
      navigate(`/job-history`);
   }).catch((error) => {
      setSubmit(false);
      NotificationError("Error", error.response.data.errorMessage || "Something went wrong");
   });
  };
  const handlePreview = () => {
      form.validate();
      window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) {
      return;
    }
    setPreview(!preview);
  };
  const form = useForm({
    mode:'controlled',
    validateInputOnChange: true,
    initialValues:{
        name: '',
        email: '',
        phone: '',
        website: '',
        resume: null,
        coverLetter: ''
    },
    validate:{
        name:isNotEmpty('Full name is required'),
        email:isNotEmpty('Email is required'),
        phone:isNotEmpty('Phone number is required'),
        website:isNotEmpty('Personal website is required'),
        resume:isNotEmpty('CV is required')
    }
  })
  return (
    <div>
        <LoadingOverlay
      className="!fixed "
      visible={submit}
      zIndex={1000}
      overlayProps={{radius: "sm" ,blur: 2}}
      loaderProps={{ color: "bright-sun.4", type: "bars" }}/>
        <div className="text-xl font-semibold mb-5">
          Submit Your Application
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex md-mx:gap-5 gap-10 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
            <TextInput
              className={`${preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              readOnly={preview}
              {...form.getInputProps('name')}
              variant={preview ? "unstyled" : "default"}
              label="Full Name"
              withAsterisk
              placeholder="Enter name"
            />
            <TextInput
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
                {...form.getInputProps('email')}
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              label="Email"
              withAsterisk
              placeholder="Enter email"
            />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
            <NumberInput
                {...form.getInputProps('phone')}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              label="Phone Number"
              withAsterisk
              hideControls
              placeholder="Enter Phone Number"
              min={0}
              max={9999999999}
              clampBehavior="strict"
            />
            <TextInput
                {...form.getInputProps('website')}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              label="Personal Website"
              withAsterisk
              placeholder="Enter Url"
            />
          </div>
          <FileInput
            {...form.getInputProps('resume')}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            withAsterisk
            leftSection={<Paperclip />}
            accept='application/pdf'
            label="Attach your Resume"
            placeholder="Your Resume"
            leftSectionPointerEvents="none"
          />
          <Textarea
            {...form.getInputProps('coverLetter')}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            placeholder="Type something about yourself"
            label="Cover Letter"
            autosize
            minRows={4}
          />
          {!preview && (
            <Button
              onClick={handlePreview}
              leftSection={<ArrowLeft size={20} />}
              color="bright-sun.5"
              variant="light"
            >
              Preview
            </Button>
          )}
          {preview && (
            <div className="flex gap-10 [&>*]:w-1/2">
              <Button
                fullWidth
                color="bright-sun.5"
                variant="outline"
                onClick={handlePreview}
              >
                Edit
              </Button>
              <Button
                fullWidth
                color="bright-sun.5"
                variant="light"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
    </div>
  )
}

export default ApplicationForm