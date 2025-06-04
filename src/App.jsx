import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/loginPage';
import SignUp from './pages/signup';
import VerifyEmail from './pages/verifyOtp';
import ResetPassword from './pages/resetPassword';
import ForgotPassword from './pages/forgotPassword';
import CreateAdmin from './pages/createAdmin';
import LayoutCitizen from './layout/citizenLayout';
import LayoutAdmin from './layout/adminLayout';
import LayoutSuperAdmin from './layout/superAdminLayout';
import NotFound from './pages/notFound';
import Loading from './pages/loadingPage';
;import AdminDashboard from './pages/adminDashboard';
import CitizenDashboard from './pages/citizenDashboard';
import SuperAdminDashboard from './pages/superAdminDashboard';
import NotificationsPage from './pages/notifications';
import SettingsPage from './pages/settings';
import UpdatePassword from './pages/updatePassword';
import HomePage from './pages/home';
import ViewAgency from './pages/viewAgency';
import ViewComplaint from './pages/viewComplaint';
import ResponsesPage from './pages/responses';
import ComplaintForm from './pages/complaintForm';
import ComplaintsPage from './pages/complaintPage';
import AgenciesPage from './pages/agencies';
import AgencyProfile from './pages/agencyProfile';
import ComplaintsAdmin from './pages/complaintsAdmin';
import UpdateComplaint from './pages/updateComplaint';
import ResponseForm from './pages/respondComplForm';
import ChangeStatus from './pages/updateStatusComp';
import ViewUser from './pages/viewUser';
import AllComplaints from './pages/allComplaints';
import CitizensPage from './pages/citizensPage';
import AgencyAdmins from './pages/agency-Admins';
import AllAgencies from './pages/agenciesPage';
import NotificationAgency from './pages/notificationAgency';

function App() {
  

  return (
    <Routes>
    {/* Public routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/verify" element={<VerifyEmail />} />
    <Route path="/forgotpass" element={<ForgotPassword />} />
    <Route path="/resetpass" element={<ResetPassword />} />
    <Route path="/loading" element={<Loading />} />
    <Route path="*" element={<NotFound />} />

    <Route path="update-pass" element={<UpdatePassword />} />
    <Route path="view-complaint/:id" element={<ViewComplaint />} />

    {/* Protected / Citizen Layout Routes */}
   

    <Route path="update-complaint/:id" element={<UpdateComplaint />} />

    <Route path="/citizen" element={<LayoutCitizen />}>
      <Route path="dashboard" element={<CitizenDashboard />} />
      <Route path="complaint-form" element={<ComplaintForm />} />
      <Route path="complaints" element={<ComplaintsPage />} />
      <Route path="responses" element={<ResponsesPage />} />
      <Route path="agencies" element={<AgenciesPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="settings" element={<SettingsPage />}/>
      <Route path="settings/update-pass" element={<UpdatePassword />} />
    </Route>


      {/* Protected / Admin Layout Routes */}
      <Route path="respond-form" element={<ResponseForm />} />
      <Route path="change-status/:id" element={<ChangeStatus />} />

      <Route path="/admin" element={<LayoutAdmin />}>
      <Route path="dashboard" element={<AdminDashboard/>} />
      <Route path="complaints/:agencyId" element={<ComplaintsAdmin/>} />
      <Route path="profile/:id" element={<AgencyProfile/>} />
      <Route path="notifications" element={<NotificationAgency />} />
      <Route path="settings" element={<SettingsPage />}/>

      
    </Route>

     {/* Protected / SuperAdmin Layout Routes */}
     <Route path="createAdmin" element={<CreateAdmin />} />
   

     <Route path="/superAdmin" element={<LayoutSuperAdmin />}>
      <Route path="dashboard" element={<SuperAdminDashboard />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="agencies" element={<AllAgencies />} />
      <Route path="allComplaints" element={<AllComplaints />} />
      <Route path="citizens" element={<CitizensPage />} />
      <Route path="citizens/view-user/:id" element={<ViewUser />} />
      <Route path="agency-admins" element={<AgencyAdmins />} />
      <Route path="agency-admins/view-agency/:id" element={<ViewAgency />} />     
    </Route>
  </Routes>
  )
}

export default App
