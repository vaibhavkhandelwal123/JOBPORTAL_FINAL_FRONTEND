import { similar } from "../Data/CompanyData"
import CompanyCard from "./CompanyCard"

const SimiliarCompanies = () => {
  return (<div className="w-1/4">
    <div className="text-xl font-semibold mb-5 text-bright-sun-400">Similar Companies Talent</div>
      <div className="flex flex-col flex-wrap gap-5">
            {
                similar.map((company,index)=><CompanyCard key={index} {...company} />)
            }
        </div>

  </div>
  )
}

export default SimiliarCompanies