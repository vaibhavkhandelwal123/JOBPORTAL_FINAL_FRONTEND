import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import { getAllProfiles } from "../Services/ProfileService";
import NewTalentCard from "./NewTalentCard";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const sort = useSelector((state:any)=>state.sort);
  const filter = useSelector((state: any) => state.filter);
  const [filtered, setFiltered] = useState([{}]);
  const [talentList, setTalentList] = useState([{}]);
  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((res) => {
        setTalentList(res);
      })
      .catch((error) => {
        console.log("Failed to fetch talents", error);
      });
  }, []);

  useEffect(()=>{
  if(sort=="Experience: Low to High"){
    setTalentList([...talentList].sort((a:any,b:any)=>a.totalExp-b.totalExp));
  }
  else if(sort=="Experience: High to Low"){
    setTalentList([...talentList].sort((a:any,b:any)=>b.totalExp-a.totalExp));
  }
  
 },[sort])

  useEffect(() => {
    let filtertalent = talentList;
    setFiltered(talentList);
    if (filter.name) {
      filtertalent = filtertalent.filter((talent: any) =>
        talent.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtertalent = filtertalent.filter((talent: any) =>
        filter["Job Title"]?.some((title: any) =>
          talent.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location && filter.Location.length > 0) {
      filtertalent = filtertalent.filter((talent: any) =>
        filter.Location?.some((location: any) =>
          talent.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Skills && filter.Skills.length > 0) {
      filtertalent = filtertalent.filter((talent: any) =>
        filter.Skills?.some((skill: any) =>
          talent.skills?.some((talentSkill: any) =>
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    if(filter.exp && filter.exp.length>0){
      filtertalent = filtertalent.filter((talent:any)=>filter.exp[0]<=talent.totalExp && talent.totalExp<=filter.exp[1]);
    }
    setFiltered(filtertalent);
  }, [filter, talentList]);
  return (
    <div className="p-5 py-5">
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-2xl xs-mx:text-xl font-semibold">Recommanded Profiles</div>
        <Sort talent/>
      </div>
      <div className="mt-10 flex flex-wrap gap-5">
        {filtered.length?filtered.map(
          (profile: any, index: number) =>
            profile.id != user.id && <NewTalentCard key={index} {...profile} />
        ):<div className="text-xl font-semibold">No Talent Found</div>}
      </div>
    </div>
  );
};

export default Talents;
