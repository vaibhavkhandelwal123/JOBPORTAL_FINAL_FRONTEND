import { Divider } from "@mantine/core"
import Post from "../Postjobs/Post"

const Postjob = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Divider size="xs" mb="md"/>
        <Post/>
    </div>
  )
}

export default Postjob