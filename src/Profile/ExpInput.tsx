import { useEffect, useState } from "react";
import { fields } from "../Data/ProfileData";
import SelectInput from "./SelectInput";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { NotificationSuccess } from "../SignUpLogin/NotificationAny";
import { changeProfile } from "../Slices/ProfileSlice";

const ExpInput = (props: any) => {
  const select = fields;
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props.add) {
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        description: props.description,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
      });
    }
  }, [props.add, profile]);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      working: false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    },
  });
  const handleSave=()=>{
    form.validate();
    if(!form.isValid())return;
    let exp = [...profile.experiences];
    if(props.add){
      exp.push(form.getValues());
      exp[exp.length-1].startDate = new Date(exp[exp.length-1].startDate).toISOString();
      if (!exp[exp.length-1].working && exp[exp.length-1].endDate) {
        exp[exp.length-1].endDate = new Date(exp[exp.length-1].endDate).toISOString();
      } else {
        exp[exp.length-1].endDate = null;
      }
    }
    else {
      exp[props.index] = form.getValues();
      exp[props.index].startDate = new Date(exp[props.index].startDate).toISOString();
      if (!exp[props.index].working && exp[props.index].endDate) {
        exp[props.index].endDate = new Date(exp[props.index].endDate).toISOString();
      } else {
        exp[props.index].endDate = null;
      }
    }
    let updatedProfile={...profile,experiences:exp};
     props.setEdit(false);
      dispatch(changeProfile(updatedProfile));
      NotificationSuccess("Success",`Experience ${props.add?"Added":" Updated"} Successfully`)
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add Experience" : "Edit Experience"}
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:gap-5 xs-mx:flex-wrap">
          <SelectInput form={form} name="title" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="">
          <SelectInput form={form} name="location" {...select[2]} />
        </div>
        <div className="">
          <Textarea
            {...form.getInputProps("description")}
            label="Summary"
            withAsterisk
            autosize
            maxRows={3}
            placeholder="Enter Summary..."
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:gap-5 xs-mx:flex-wrap">
          <MonthPickerInput
            {...form.getInputProps("startDate")}
            maxDate={form.getValues().endDate || undefined}
            withAsterisk
            label="Start date"
            placeholder="Pick date"
          />

          <MonthPickerInput
            {...form.getInputProps("endDate")}
            maxDate={new Date()}
            disabled={form.getValues().working}
            withAsterisk
            minDate={form.getValues().startDate || undefined}
            label="End date"
            placeholder="Pick date"
          />
        </div>
      </div>
      <Checkbox
        checked={form.getValues().working}
        onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)}
        className="flex items-center [&>*]:items-center"
        autoContrast
        label="Currently working here"
      />
      <div className="flex gap-5 xs:w-2/5">
        <Button
          onClick={handleSave}
          color="green.8"
          variant="light"
          fullWidth
        >
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red.8"
          variant="light"
          fullWidth
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExpInput;
