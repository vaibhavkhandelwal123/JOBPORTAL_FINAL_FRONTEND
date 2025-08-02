import MultiInput from "./MultiInput";
import { dropdownData } from "../Data/JobData";
import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
const SearchBar = () => {
  const matches = useMediaQuery('(max-width: 475px)');
  const [opened,{toggle}] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 300]);
  const handleChange= (event:any)=>{
    dispatch(updateFilter({salary:event}));
  
  }
  return (<div>
    <div className="flex justify-end">

    {matches&&<Button onClick={toggle} my="sm" radius="lg" variant="outline" autoContrast color="bright-sun.4">{opened?"Close":"Filters"}</Button>}
    </div>
    <Collapse in={(opened || !matches)}>
    <div className="flex px-5 py-8 items-center lg-mx:flex-wrap ">
      {dropdownData.map((item, index) => (
        <>
          <div key={index} className=" w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
            <MultiInput {...item} />
          </div>
          <Divider className="sm-mx:hidden" size="xs" orientation="vertical" />
        </>
      ))}
      <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full [&_.mantine-Slider-label]:translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary</div>
          <div>&#8377;{value[0]} LPA-&#8377;{value[1]} LPA</div>
        </div>
        <RangeSlider
        onChangeEnd={handleChange}
          size="xs"
          color="bright-sun.4"
          value={value}
          labelTransitionProps={{
            transition:'skew-down',
            duration: 150,
            timingFunction: 'linear',

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
