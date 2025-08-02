import { formatData } from "../Services/Utilities";

const CertCard = (props:any) => {
    return (
        <div className="flex justify-between sm-mx:flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
              <img className="h-8 w-8" src={`/Logos/${props.issuer}.png`} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold xs-mx:text-sm">{props.title}</div>
              <div className="text-sm xs-mx:text-xs text-mine-shaft-300">
              {props.issuer}
            </div>
            </div>
          </div>
          <div className=" flex flex-col items-end sm-mx:flex-row sm-mx:gap-2">
            <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">Issue Date : {formatData(props.issueDate)}</div>
            <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">ID: {props.certificateId}</div>
          </div>
        </div>
        
    );
  };
  
  export default CertCard;
  