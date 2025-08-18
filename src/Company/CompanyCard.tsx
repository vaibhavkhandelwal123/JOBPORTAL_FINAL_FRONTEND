import { ActionIcon } from "@mantine/core";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const CompanyCard = (props: any) => {
  return (
    <div>
      <div className="flex justify-between  bg-mine-shaft-900 items-center rounded-lg p-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={props.pictures
                  ? `data:image/png;base64,${props.pictures}`
                  : `/Logos/${props.name}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold">{props.name}</div>
            <div className="text-xs">{props.size > 100 && props.size < 1000 ? `+100` : props.size > 1000 && props.size < 9999 ? `+1k` : props.size >= 9999 && `+10k`} Employees</div>
          </div>
        </div>
        <div>
          <Link to={`/company/${props.id}`}>
            <ActionIcon color="bright-sun.4" variant="subtle">
              <ExternalLink />
            </ActionIcon>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
