import { MapIcon, MapPin, SearchIcon } from "lucide-react";

const searchFields = [
  {
    title: "Job Title",
    icon: SearchIcon,
    options: [
      "Designer",
      "Developer",
      "Product Manager",
      "Marketing Specialist",
      "Data Analyst",
      "Sales Manager",
      "HR Specialist",
      "Content Writer",
    ],
  },
  {
    title: "Location",
    icon: MapPin,
    options: [
      "New York",
      "San Francisco",
      "Los Angeles",
      "Chicago",
      "Seattle",
      "Boston",
      "Austin",
      "Denver",
    ],
  },
  {
    title: "Skills",
    icon: MapIcon,
    options: [
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "Ruby",
      "PHP",
      "Swift",
      "Go",
      "ReactJS",
      "Node.js",
      "Django",
      "Flask",
      "Ruby on Rails",
      "Angular",
      "Vue.js",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Git",
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "Google Cloud",
    ],
  },
];

const talents = [
  {
    name: "Jarrod Wood",
    role: "Software Engineer",
    company: "Google",
    topSkills: ["React", "SpringBoot", "MongoDB"],
    about:
      "As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.",
    expectedCtc: "₹48 – 60LPA",
    location: "New York, United States",
    image: "avatar-7",
  },
  {
    name: "Alice Johnson",
    role: "Full Stack Developer",
    company: "Meta",
    topSkills: ["Node.js", "React", "GraphQL"],
    about:
      "Experienced Full Stack Developer at Meta with a focus on scalable web applications and modern architecture. Adept in Node.js and GraphQL with a passion for clean, maintainable code.",
    expectedCtc: "₹40 – 55LPA",
    location: "San Francisco, United States",
    image: "avatar-8",
  },
  {
    name: "Michael Lee",
    role: "Backend Developer",
    company: "Amazon",
    topSkills: ["Java", "AWS", "Microservices"],
    about:
      "Backend Developer with a strong understanding of distributed systems and cloud-based infrastructures. Currently building scalable services at Amazon.",
    expectedCtc: "₹45 – 65LPA",
    location: "Seattle, United States",
    image: "avatar-9",
  },
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    company: "Netflix",
    topSkills: ["Vue.js", "TypeScript", "CSS"],
    about:
      "Frontend Developer at Netflix specializing in performance and accessibility. Committed to creating pixel-perfect, intuitive interfaces.",
    expectedCtc: "₹35 – 50LPA",
    location: "Los Angeles, United States",
    image: "avatar-7",
  },
  {
    name: "Arjun Patel",
    role: "DevOps Engineer",
    company: "Microsoft",
    topSkills: ["Docker", "Kubernetes", "Azure"],
    about:
      "DevOps Engineer at Microsoft focused on CI/CD automation and cloud-native applications. Skilled in Docker, Kubernetes, and Azure DevOps.",
    expectedCtc: "₹42 – 58LPA",
    location: "Redmond, United States",
    image: "avatar-8",
  },
  {
    name: "Sara Kim",
    role: "Machine Learning Engineer",
    company: "Tesla",
    topSkills: ["Python", "TensorFlow", "Data Science"],
    about:
      "Machine Learning Engineer at Tesla, building predictive models and intelligent systems using Python and TensorFlow.",
    expectedCtc: "₹50 – 70LPA",
    location: "Palo Alto, United States",
    image: "avatar-9",
  },
  {
    name: "Daniel Garcia",
    role: "Cloud Architect",
    company: "IBM",
    topSkills: ["GCP", "Terraform", "Networking"],
    about:
      "Cloud Architect at IBM with extensive experience in GCP and infrastructure as code. Passionate about scalable cloud solutions.",
    expectedCtc: "₹55 – 75LPA",
    location: "Austin, United States",
    image: "avatar-7",
  },
  {
    name: "Emily Zhang",
    role: "UI/UX Designer",
    company: "Adobe",
    topSkills: ["Figma", "Sketch", "Prototyping"],
    about:
      "UI/UX Designer at Adobe with a strong eye for aesthetics and user-centered design. Expert in Figma and creating engaging interfaces.",
    expectedCtc: "₹30 – 45LPA",
    location: "San Jose, United States",
    image: "avatar-8",
  },
  {
    name: "Ravi Verma",
    role: "Cybersecurity Analyst",
    company: "Cisco",
    topSkills: ["SIEM", "Penetration Testing", "Python"],
    about:
      "Cybersecurity Analyst at Cisco with experience in threat detection and response. Skilled in penetration testing and security automation.",
    expectedCtc: "₹38 – 52LPA",
    location: "Bangalore, India",
    image: "avatar-9",
  },
  {
    name: "Lina Morales",
    role: "Product Manager",
    company: "Airbnb",
    topSkills: ["Agile", "Scrum", "Product Strategy"],
    about:
      "Product Manager at Airbnb with a track record of leading cross-functional teams to deliver impactful product features.",
    expectedCtc: "₹60 – 80LPA",
    location: "San Francisco, United States",
    image: "avatar-7",
  },
];

const profile = {
  name: "Vaidehi Dixit",
  role: "Software Engineer",
  company: "TCS",
  location: "Bangalore, India",
  about:
    "Passionate software engineer with experience in project developing scalable web applications. Strong background in JavaScript, TypeScript, and cloud technologies. Proven track record of leading engineering teams and delivering high-impact projects. Constant learner and advocate for clean code and agile practices.",
  skills: [
    "JavaScript",
    "React",
    "Redux",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "MySQL",
    "MongoDB",
    "Scrum",
  ],
  experience: [
    {
      title: "Cyber Security Analyst",
      company: "Microsoft",
      location: "Bangalore, India",
      start_date: "November 2024",
      end_date: "March 2024",
      description:
        "Led the development of a microservices-based internal dashboard used by 500+ engineers. Optimized cloud functions, reducing response time by 35%. Mentored 4 junior engineers and reviewed 100+ PRs monthly.",
    },
    {
      title: "Software Engineer",
      company: "Spotify",
      location: "San Francisco, CA",
      start_date: "July 2017",
      end_date: "February 2021",
      description:
        "Built new modules for Jira Cloud using React and Node.js. Integrated third-party tools through REST/GraphQL APIs. Participated in bi-weekly sprint planning and retrospectives.",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon",
      issue_date: "September 2022",
      certification_id: "AWS-ASA-0922-56789",
    },
    {
      name: "React Professional Certification",
      issuer: "Meta",
      issue_date: "June 2021",
      certification_id: "META-RPC-61234",
    },
  ],
};

export { searchFields, talents, profile };
