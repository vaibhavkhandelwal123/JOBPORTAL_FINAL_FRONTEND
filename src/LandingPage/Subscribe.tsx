import { Button, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Subscribe = () => {
  const matches = useMediaQuery("(max-width: 639px)");
  const matches1 = useMediaQuery("(max-width: 475)");
  return (
    <div className="mt-20 flex items-center bg-mine-shaft-900 mx-20 sm-mx:mx-5 py-3 rounded-xl justify-around flex-wrap">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl w-2/5 bs-mx:w-4/5 mb-3 text-center font-semibold text-mine-shaft-100 [&>span]:text-bright-sun-400 ">
        Never Wants to Miss Any<span> Job News?</span>
      </div>
      <div className="flex gap-4 xs-mx:flex-col rounded-xl bg-mine-shaft-700 px-3 py-2 xs:items-center sm:mr-4">
        <TextInput
          className="[&_input]:text-mine-shaft-100 font-semibold"
          variant="unstyled"
          placeholder="Your@email.com"
          size={matches1?"sm":matches?"md":"xl"}
        />
        <Button size={matches1?"sm":matches?"md":"xl"} color="#FFD800" variant="filled">Subscribe</Button>
      </div>
    </div>
  );
};

export default Subscribe;
