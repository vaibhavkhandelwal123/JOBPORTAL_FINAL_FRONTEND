import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-3 text-center font-semibold text-mine-shaft-100 [&>span]:text-bright-sun-400 ">
        What<span> User </span>says about us
      </div>
      <div className="flex justify-evenly sm-mx:mx-2 gap-5 md-mx:flex-wrap mt-10">
        {
          testimonials.map((testimonial, index) => (
            <div
            key={index}
              className="flex flex-col p-3 gap-3 w-[23%] md-mx:w-[48%] sm-mx:w-full border border-bright-sun-400 rounded-xl"
            >
              <div className="flex gap-2 items-center ">
                <Avatar className="!h-14 !w-14" src="/avatar-9.png" alt="User"/>
                <div>
                  <div className="text-lg sm-mx:text-base xs-mx:text-sm text-mine-shaft-100 font-semibold">{testimonial.name}</div>
                  <Rating value={testimonial.rating} fractions={2} readOnly />
                </div>
              </div>
              <div className="text-xs text-mine-shaft-300">
                {testimonial.review}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Testimonials;
