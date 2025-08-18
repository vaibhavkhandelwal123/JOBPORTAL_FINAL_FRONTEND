const AboutComp = (props: any) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl xs-mx:text-lg mb-3 font-md">{props.overview}</div>
      <div className="text-xl xs-mx:text-lg font-semibold">Specialities</div>
      <div className="flex flex-wrap gap-2 text-sm text-justify">
        {props?.specialties?.map((item: string, index: number) => (
          <span
            className="bg-bright-sun-400 xs-mx:text-sm rounded-full p-1 text-black"
            key={index}
          >
            {" "}
            {item}
          </span>
        ))}
      </div>
      <div>
        <div className="text-xl xs-mx:text-lg font-semibold">Website</div>
        <div>
          <a
            href={props.website}
            className=" text-sm text-bright-sun-400 text-justify"
          >
            {props.website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutComp;
