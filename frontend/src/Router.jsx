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
  AssignedApplicationsPage,
  EvaluatedApplicationsPage,
  AdminDashboard,
  AdminPanel,
  CommitteePanel,
  StudentPanel,
  CommitteeDashboard,
  StudentDashboard,
  StudentManagementPage,
  CommitteeManagementPage,
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
          <Route index element={<AdminDashboard />} />
          <Route path="scholarships" element={<ScholarManagementPage />} />
          <Route path="committee" element={<CommitteeManagementPage />} />
          <Route
            path="applicationmanagement"
            element={<ApplicationsManagementPage />}
          />
          <Route path="students" element={<StudentManagementPage />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentPanel />}>
          <Route index element={<StudentDashboard />} />
          <Route path="scholarships" element={<AvailableScholarshipsPage />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="profile" element={<StudentProfilePage />} />
        </Route>

        {/* Committee Routes */}
        <Route path="/committee" element={<CommitteePanel />}>
          <Route index element={<CommitteeDashboard />} />
          <Route path="assigned" element={<AssignedApplicationsPage />} />
          <Route
            path="application/:id/evaluate"
            element={<ApplicationEvaluationPage />}
          />
          <Route path="evaluated" element={<EvaluatedApplicationsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
