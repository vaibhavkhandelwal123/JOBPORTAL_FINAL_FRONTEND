import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { getAllCompanies } from "../Services/CompanyService";
import { Skeleton } from "@mantine/core";
import { useParams } from "react-router-dom";

const SimiliarCompanies = () => {
  const { id } = useParams();
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllCompanies()
      .then((data: any[]) => {
        setSimilar(data || []);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setSimilar([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="w-1/4 md-mx:w-full">
      <div className="text-2xl text-center font-semibold mb-5 text-bright-sun-400">
        Similar Companies
      </div>

      <div className="flex bs:flex-col bs-mx:justify-center flex-wrap justify-between gap-5">
        {loading ? (
          <div className="font-semibold flex-col flex gap-5 sm-mx:flex-wrap sm-mx:gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height={100} width={300} className="!rounded-xl" />
            ))}
          </div>
        ) : similar.length > 1 ? (
          similar
            .filter((job) => String(job.id) !== String(id))
            .slice(0, 5)
            .map((job, index) => <CompanyCard key={index} {...job} />)
        ) : (
          <div className="text-center md-mx:text-center md-mx:m-auto font-semibold text-xl">
            No Similar Companies Found
          </div>
        )}
      </div>
    </div>
  );
};

export default SimiliarCompanies;
