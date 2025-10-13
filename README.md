# Scholarship Website

This project is a web-based platform for managing scholarships. It provides a portal for students to find and apply for scholarships, for administrators to manage scholarships and users, and for a committee to review applications.

## Project Details

For a detailed overview of the project, please refer to the "Scholarship zone.pdf" file included in this repository.

## Setup Instructions

This project is divided into two main parts: a frontend application and a backend server.

### Frontend

The frontend is a React application. For detailed setup instructions, please refer to the `README.md` file located in the `frontend` directory.

### Backend

The backend is a Node.js application. For detailed setup instructions, please refer to the `README.md` file located in the `server` directory. (Note: This file does not currently exist).

## Functional Requirements

The system provides different functionalities for three types of users: Students, Administrators, and Scholarship Committee Members.

### Student Panel

The student panel allows students to manage their profile and scholarship applications.

| Functionality | Description |
| :--- | :--- |
| Register/Login | Students can login with specific id and password to access the web portal |
| Scholarship Search | Students can search, view details online, using filters like eligibility criteria, deadline etc. |
| Apply Online | Students can submit scholarship applications easily. |
| Upload Documents | Students can attach required documents like transcripts, ID proof etc. |
| Receive Notifications | Students will Get alerts for application updates, deadlines or new scholarship opportunities. |
| Application Tracking | Students can track the status scholarship applications, staying updated on approvals, rejections, or pending actions. |
| View History of Submissions | Students can access a record of past scholarship applications, including status and details. |
| Profile Management | Students can update personal and academic information. |

### Admin Panel

The admin panel provides tools for managing the scholarship platform.

| Functionality | Description |
| :--- | :--- |
| Login | Secure login with email and password |
| Scholarship Management | Create, edit and delete scholarship opportunities. |
| User Management | View, activate, deactivate, or delete users |
| Application Management | Review, approve, or reject scholarship applications. |
| Document Verification | Verify uploaded documents for authenticity. |
| Notification Management | Send notifications to students about application status and updates through emails. |
| Reporting and Analytics | Generate reports on scholarship applications, approvals, and rejections. |
| System Configuration | Configure system settings, eligibility criteria, and deadlines. |
| Profile management | Admin can update personal information. |

### Scholarship Committee Panel

The scholarship committee panel allows committee members to review and evaluate scholarship applications.

| Functionality | Description |
| :--- | :--- |
| Committee Login | Committee members can securely log in using Committee Login credentials. |
| Dashboard Access | Displays overview of assigned applications, pending reviews, deadlines, and notifications. |
| View Assigned Applications | Committee members can access applications assigned to them by the admin. |
| View Application Details | Full view of student data including academic records, financial documents, essays, and uploaded files. |
| Application Filtering & Sorting | Filter applications by program, department, GPA, financial status, or submission date. |
| Evaluate Applications | Committee members can assess applications based on predefined evaluation criteria (e.g., merit, need, extracurricular). |
| Scoring Mechanism | Enter numerical scores or qualitative remarks for each evaluation parameter. |
| Save Evaluation Progress | Save partial reviews to return and complete later. |
| Submit Evaluation | Submit final evaluation and recommendation for selected candidates. |
| View Evaluation History | Access previously evaluated applications and scoring history. |
| Secure Logout | Logout of session to prevent unauthorized access. |
| Session Timeout | Automatic logout after inactivity to maintain system security. |