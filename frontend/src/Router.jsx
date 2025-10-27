import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  LandingPage,
  Scholarships,
  About,
  Contact,
  AdminPage,
  AvailableScholarshipsPage,
  MyApplications,
  StudentProfilePage,
  ScholarManagementPage,
  LoginPage,
  StudentDashboard,
  RegisterPage,
  ApprovedApplicationsPage,
  CommitteeDashboard,
  PendingReviewsPage,
  SettingsPage,
  ApplicationsManagementPage,
  ScholarshipApplicationPage,
  StudentsManagementPage,
} from "@/pages";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route
          path="/scholarships/apply/:id"
          element={<ScholarshipApplicationPage />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Parent Route */}
        <Route path="/admin" element={<AdminPage />}>
          {/* Nested Routes (render inside <Outlet />) */}
          <Route index element={<ScholarManagementPage />} />
          <Route path="students" element={<StudentsManagementPage />} />
          <Route
            path="applicationmanagement"
            element={<ApplicationsManagementPage />}
          />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<AvailableScholarshipsPage />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="profile" element={<StudentProfilePage />} />
        </Route>

        {/* Committee Routes */}
        <Route path="/committee" element={<CommitteeDashboard />}>
          <Route index element={<PendingReviewsPage />} />
          <Route path="approved" element={<ApprovedApplicationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
