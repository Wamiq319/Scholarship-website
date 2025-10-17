import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  LandingPage,
  Scholarships,
  ScholarshipsForPenal,
  About,
  Contact,
  AdminPage,
  CommitteePage,
  StudentPage,
  Students,
  AvailableScholarships,
  MyApplications,
  StudentProfile,
  PendingReviews,
  ApprovedApplications,
  Settings,
} from "./pages";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Parent Route */}
        <Route path="/admin" element={<AdminPage />}>
          {/* Nested Routes (render inside <Outlet />) */}
          <Route index element={<ScholarshipsForPenal />} />
          <Route path="students" element={<Students />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentPage />}>
          <Route index element={<AvailableScholarships />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* Committee Routes */}
        <Route path="/committee" element={<CommitteePage />}>
          <Route index element={<PendingReviews />} />
          <Route path="approved" element={<ApprovedApplications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRouter;
