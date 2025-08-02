import { ActionIcon } from "@mantine/core"
import { ExternalLink } from "lucide-react"

const CompanyCard = (props:any) => {
  return (
    <div><div className="flex justify-between  bg-mine-shaft-900 items-center rounded-lg p-2">
    <div className="flex items-center gap-2">
      <div className="p-2 bg-mine-shaft-800 rounded-md">
        <img src={`/Logos/${props.name}.png`} alt="" />
      </div>
      <div>
        <div className="font-semibold">{props.name}</div>
        <div className="text-xs">{props.employees} Employees</div>
      </div>
    </div>
    <div>
      <ActionIcon color="bright-sun.4" variant="subtle">
        <ExternalLink/>
      </ActionIcon>
    </div>
  </div></div>
  )
}

export default CompanyCard