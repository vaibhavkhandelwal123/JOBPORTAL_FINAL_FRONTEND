import{ Search, MapPin, BriefcaseBusiness,BookCheckIcon } from "lucide-react";
const dropdownData = [
    {title:"Job Title", icon:Search,options:['Developer','Designer','Manager','Analyst','Architect','Consultant','Coordinator','Director','Officer','Specialist','Administrator']},
    {title:"Location", icon:MapPin,options:['New York','Los Angeles','Chicago','Houston','Delhi','Philadelphia','San Antonio','San Diego','Dallas','San Jose']},
    {title:"Experience", icon:BriefcaseBusiness,options:['Entry Level','Intermediate','Expert']},
    {title:"Job Type", icon:BookCheckIcon,options:['Full Time','Part Time','Contract','Freelance','Internship']}
]
const jobList = [
    {
      jobTitle: "Product Designer",
      company: "Meta",
      applicants: 25,
      experience: "Entry Level",
      jobType: "Full-Time",
      location: "New York",
      package: "32 LPA",
      postedDaysAgo: 12,
      description: "Meta is seeking a Product Designer to join our team. You’ll work on crafting intuitive user experiences for our blockchain wallet platform, collaborating with developers and stakeholders."
    },
    {
      jobTitle: "Software Engineer",
      company: "Microsoft",
      applicants: 40,
      experience: "Mid Level",
      jobType: "Full-Time",
      location: "Redmond",
      package: "45 LPA",
      postedDaysAgo: 10,
      description: "Microsoft is hiring a Software Engineer to build scalable backend systems and cloud-native applications for Azure, integrating cutting-edge AI technologies across multiple platforms."
    },
    {
      jobTitle: "UX Researcher",
      company: "Google",
      applicants: 30,
      experience: "Entry Level",
      jobType: "Contract",
      location: "Mountain View",
      package: "28 LPA",
      postedDaysAgo: 8,
      description: "Google's Design team seeks a UX Researcher to help shape the future of our apps through rigorous testing, user interviews, and data analysis."
    },
    {
      jobTitle: "Backend Developer",
      company: "Spotify",
      applicants: 15,
      experience: "Mid Level",
      jobType: "Full-Time",
      location: "Stockholm",
      package: "35 LPA",
      postedDaysAgo: 5,
      description: "Spotify is searching for a Backend Developer to optimize our music delivery pipeline, improve API reliability, and scale microservices for millions of users."
    },
    {
      jobTitle: "Data Scientist",
      company: "IBM",
      applicants: 35,
      experience: "Mid Level",
      jobType: "Full-Time",
      location: "Bangalore",
      package: "42 LPA",
      postedDaysAgo: 14,
      description: "IBM is looking for skilled Data Scientists to apply machine learning models to business problems and work closely with clients to build intelligent solutions using Watson AI."
    },
    {
      jobTitle: "Hardware Engineer",
      company: "Samsung",
      applicants: 18,
      experience: "Senior Level",
      jobType: "Full-Time",
      location: "Seoul",
      package: "55 LPA",
      postedDaysAgo: 9,
      description: "Samsung’s Hardware Engineering team needs a seasoned engineer to contribute to next-gen chip development, testing procedures, and manufacturing innovation in high-performance electronics."
    },
    {
      jobTitle: "Cloud Solutions Architect",
      company: "Amazon",
      applicants: 60,
      experience: "Senior Level",
      jobType: "Full-Time",
      location: "Seattle",
      package: "60 LPA",
      postedDaysAgo: 3,
      description: "At Amazon Web Services, you’ll architect scalable and secure cloud solutions, mentor junior engineers, and engage with enterprise clients to lead their digital transformation."
    },
    {
      jobTitle: "iOS Developer",
      company: "Apple",
      applicants: 20,
      experience: "Entry Level",
      jobType: "Internship",
      location: "Cupertino",
      package: "20 LPA",
      postedDaysAgo: 7,
      description: "Join Apple’s iOS development internship program where you’ll work on real products, contribute to Swift-based app features, and receive mentorship from industry leaders."
    }
  ];
  

export {dropdownData,jobList};