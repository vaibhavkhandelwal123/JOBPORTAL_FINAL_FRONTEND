import { Button, Divider } from "@mantine/core"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Company from "../Company/Company";
import SimiliarCompanies from "../Company/SimiliarCompanies";

const CompanyPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
            <Divider size="xs"/>
              <Button onClick={() => navigate(-1)} leftSection={<ArrowLeft size={20}/>} color="bright-sun.5" my="md" variant="light">Back</Button>
           
            <div className="flex gap-5 justify-between">
                <Company/>
                <SimiliarCompanies/>
            </div>
        </div>
  )
}

export default CompanyPage