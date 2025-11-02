import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  LandingPage,
  Scholarships,
  About,
  Contact,
  AvailableScholarshipsPage,
  MyApplications,
  StudentProfilePage,
  ScholarManagementPage,
  LoginPage,
  RegisterPage,
  ApplicationsManagementPage,
  ScholarshipApplicationPage,
  ApplicationEvaluationPage,
  UserManagementPage,
  AssignedApplicationsPage,
  EvaluatedApplicationsPage,
  AdminDashboard,
  AdminPanel,
  CommitteePanel,
  StudentPanel,
  CommitteeDashboard,
  StudentDashboard,
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
        <Route path="/admin" element={<AdminPanel />}>
          {/* Nested Routes (render inside <Outlet />) */}
          <Route index element={<ScholarManagementPage />} />
          <Route path="students" element={<UserManagementPage />} />
          <Route
            path="applicationmanagement"
            element={<ApplicationsManagementPage />}
          />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentPanel />}>
          <Route index element={<AvailableScholarshipsPage />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>

        {/* Committee Routes */}
        <Route path="/committee" element={<CommitteePanel />}>
          <Route index element={<AssignedApplicationsPage />} />
          <Route
            path="application/:id/evaluate"
            element={<ApplicationEvaluationPage />}
          />
          <Route path="evaluated" element={<EvaluatedApplicationsPage />} />
          <Route path="dashboard" element={<CommitteeDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
