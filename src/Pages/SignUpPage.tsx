import { useLocation, useNavigate } from "react-router-dom";
import Login from "../SignUpLogin/Login";
import SignUp from "../SignUpLogin/SignUp";
import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] sm-mx:overflow-y-auto overflow-hidden">
      <Button className="!absolute left-5 mt-5 z-10" onClick={() => navigate("/")} leftSection={<ArrowLeft size={20}/>} color="bright-sun.5" variant="light">Home</Button>
      <div className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 transition-all ease-in-out duration-1000 ${location.pathname=='/signup'?'-translate-x-1/2 sm-mx:-translate-x-full':'translate-x-0'} `}>
        <Login/>
        <div className={`flex gap-5 items-center sm-mx:min-h-full sm-mx:hidden justify-center transition-all ease-in-out duration-1000 bg-mine-shaft-900 w-1/2 h-full ${location.pathname=='/signup'?'rounded-r-[200px]':'rounded-l-[200px]'} flex-col`}>
          <div className="flex items-center text-bright-sun-400 ">
            <div className="font-bold text-3xl">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
                <span className="text-5xl bs-mx:4xl md-mx:3xl font-semibold ml-1">TargetJobs</span>
              </div>
            </div>
          </div>
          <div className="text-2xl bs-mx:text-xl md-mx:text-lg text-mine-shaft-200">
            Find the made for you
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
