import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";
import NewTalentCard from "../FindTalent/NewTalentCard";
import { Skeleton } from "@mantine/core";

const CompanyEmployees = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [, setProfiles] = useState([{}]);
  const [filtered, setFiltered] = useState([{}]);
  useEffect(() => {
    setLoading(true);
    getAllProfiles().then((data: any) => {
      setProfiles(data);
      setFiltered(data.filter((profile: any) => profile.company == props.name));
      setLoading(false);
    });
  }, [props.name]);

  return (
    <div className="mt-10 flex flex-wrap gap-10 mx-10 ">
      {loading ? (
        <div className="font-semibold flex gap-5 sm-mx:flex-wrap sm-mx:gap-3">
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
          <Skeleton height={250} width={300} className="!rounded-xl" />
        </div>
      ) : filtered.length > 0 ? (
        filtered.map(
          (profile: any, index: any) =>
            index < 6 && <NewTalentCard key={index} {...profile} />
        )
      ) : (
        <div className="font-semibold text-xl">No employees found</div>
      )}
    </div>
  );
};

export default CompanyEmployees;
