import { formatData } from "../Services/Utilities";

const ExpCard = (props:any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-8 w-8" src={`/Logos/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &#x2022; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          {formatData(props.startDate)} - {formatData(props.endDate)}
        </div>
      </div>
      <div className="text-sm xs-mx:text-xs text-justify text-mine-shaft-300">
        {props.description}
      </div>
    </div>
  );
};

export default ExpCard;
