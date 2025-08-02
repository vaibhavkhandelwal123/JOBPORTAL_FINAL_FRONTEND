import { BrowserRouter, Route, Routes } from "react-router-dom"
import Scroll from "../Scroll"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import HomePage from "./HomePage"
import TalentProfile from "../FindTalent/TalentProfile"
import Forgot from "../SignUpLogin/Forgot"
import ApplyJob from "./ApplyJob"
import CompanyPage from "./CompanyPage"
import FindJobs from "./FindJobs"
import FindTalent from "./FindTalent"
import JobDescPage from "./JobDescPage"
import JobHistoryPage from "./JobHistoryPage"
import Postjobs from "./Postjobs"
import ProfilePage from "./ProfilePage"
import SignUpPage from "./SignUpPage"
import PostedJobsPage from "./PostedJobsPage"
import ProtectedRoutes from "../Services/ProtectedRoutes"
import PublicRoutes from "../Services/PublicRoute"

const AppRoutes = () => {
  
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Scroll />
        <main className="flex-grow">
          <Routes>
            <Route path="/find-jobs" element={<ProtectedRoutes allowedRoles={["APPLICANT"]}><FindJobs /></ProtectedRoutes>} />
            <Route path="/find-talent" element={<ProtectedRoutes allowedRoles={["EMPLOYER"]}><FindTalent /></ProtectedRoutes>} />
            <Route path="/jobs/:id" element={<JobDescPage />} />
            <Route path="/apply-job/:id" element={<ProtectedRoutes allowedRoles={["APPLICANT"]}><ApplyJob /></ProtectedRoutes>} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/posted-job/:id" element={<ProtectedRoutes allowedRoles={["EMPLOYER"]}><PostedJobsPage /></ProtectedRoutes>} />
            <Route path="/job-history" element={<ProtectedRoutes allowedRoles={["APPLICANT"]}><JobHistoryPage /></ProtectedRoutes>} />
            <Route path="/post-job/:id" element={<ProtectedRoutes allowedRoles={["EMPLOYER"]}><Postjobs /></ProtectedRoutes>} />
            <Route path="/signup" element={<PublicRoutes><SignUpPage /></PublicRoutes>} />
            <Route path="/login" element={<SignUpPage />} />
            <Route path="/talent-profile/:id" element={<ProtectedRoutes allowedRoles={["EMPLOYER"]}><TalentProfile /></ProtectedRoutes>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;