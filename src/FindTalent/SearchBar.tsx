import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../Data/TalentData";
import { UserCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);

  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");
  const handleChange = (name: any, event: any) => {
    if (name == "exp") dispatch(updateFilter({ exp: event }));
    else {
      dispatch(updateFilter({ name: event.target.value }));
      setName(event.target.value);
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button
            onClick={toggle}
            my="sm"
            radius="lg"
            variant="outline"
            autoContrast
            color="bright-sun.4"
          >
            {opened ? "Close" : "Filters"}
          </Button>
        )}
      </div>
      <Collapse in={opened || !matches}>
      <div className="flex px-5 lg-mx:flex-wrap py-8 items-center ">
        <div className="w-1/5 xs-mx:mb-1 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full flex items-center">
          <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
            <UserCircle size={20} />
          </div>
          <Input
            defaultValue={name}
            onChange={(e) => handleChange("name", e)}
            className="[&_input]:!placeholder-mine-shaft-300"
            variant="unstyled"
            placeholder="Talent Name"
          />
        </div>
        <Divider className="sm-mx:hidden" size="xs" orientation="vertical" />
        {searchFields.map((item, index) => (
          <>
            <div
              key={index}
              className="w-1/5 xs-mx:mb-1 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full"
            >
              <MultiInput {...item} />
            </div>
            <Divider
              className="sm-mx:hidden"
              size="xs"
              orientation="vertical"
            />
          </>
        ))}
        <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full [&_.mantine-Slider-label]:translate-y-10">
          <div className="flex text-sm justify-between">
            <div>Experience (Year)</div>
            <div>
              {value[0]} - {value[1]}{" "}
            </div>
          </div>
          <RangeSlider
            onChangeEnd={(e) => handleChange("exp", e)}
            size="xs"
            color="bright-sun.4"
            value={value}
            max={50}
            min={1}
            minRange={1}
            labelTransitionProps={{
              transition: "skew-down",
              duration: 150,
              timingFunction: "linear",
            }}
            onChange={setValue}
          />
        </div>
      </div>
      </Collapse>
    </div>
  );
};

export default SearchBar;
