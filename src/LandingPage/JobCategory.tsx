import { Carousel } from '@mantine/carousel';
import * as Icons from 'lucide-react';
import { ArrowRight as IconArrowRight, ArrowLeft as IconArrowLeft } from 'lucide-react';
import { jobCategories } from '../Data/Data';
import { useMediaQuery } from '@mantine/hooks';
const JobCategory = () => {   
  const matches = useMediaQuery("(min-width: 475px)");
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl mb-3 md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold text-mine-shaft-100 [&>span]:text-bright-sun-400 ">
        Browse<span> Job</span> Category
      </div>
      <div className="text-lg sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-mine-shaft-300 text-center sm-mx:w-11/12 w-1/2">
        Explore diverse job opportunnities tailored to your skills and interests.Start your career journey today!
      </div>
      <Carousel slideSize="22%" controlsOffset="md"  loop className="focus-visible:[&_button]:outline-none
      [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100 "
      nextControlIcon={<IconArrowRight className="h-8 w-8" />}
      previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
      >
  {jobCategories.map((category, index) => {
    const Icon = Icons[category.icon as keyof typeof Icons] as React.ElementType;

    return (
      <Carousel.Slide key={index} className="px-2 mx-4">
        <div className="h-full flex flex-col w-64 xs-mx:w-48 xs-mx:h-48  justify-evenly border-2 border-bright-sun-400 rounded-xl p-4 bg-mine-shaft-900 hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] !shadow-bright-sun-300 transition duration-300 ease-in-out">
          <div className="flex justify-center mb-2">
          {matches?<Icon size={36} className="text-bright-sun-400" />:<Icon size={25} className="text-bright-sun-400" />}
          </div>
          <h3 className="text-center xs-mx:text-sm text-lg  font-bold  text-mine-shaft-100">{category.jobTitle}</h3>
          <p className="text-center xs-mx:text-xs text-mine-shaft-300 text-sm xs:mt-1 xs:mb-2">{category.jobDescription}</p>
          <p className="text-center xs-mx:text-sm text-bright-sun-400 font-semibold">{category.totalNewJobsPosted} new jobs posted</p>
        </div>
      </Carousel.Slide>
    );
  })}
</Carousel>

    </div>
  );
};

export default JobCategory;
