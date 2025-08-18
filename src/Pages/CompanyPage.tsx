import { Button, Divider } from "@mantine/core"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import Company from "../Company/Company";
import SimiliarCompanies from "../Company/SimiliarCompanies";
import { useEffect, useState } from "react";
import { getCompany } from "../Services/CompanyService";

const CompanyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company,setCompany] = useState<any>(null);
    useEffect(() => {
      getCompany(id).then((data:any) => {
        setCompany(data);
      }).catch((err:any) => {
        console.error(err);
      });
    }, [id]);
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
            <Divider size="xs"/>
              <Button onClick={() => navigate(-1)} leftSection={<ArrowLeft size={20}/>} color="bright-sun.5" my="md" variant="light">Back</Button>
           
            <div className="flex gap-5 justify-between md-mx:flex-wrap">
                <Company {...company}/>
                <SimiliarCompanies/>
            </div>
        </div>
  )
}

export default CompanyPage