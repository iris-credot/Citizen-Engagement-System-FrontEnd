import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/logIn';
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
import CiitizenDashboard from './pages/citizenDashboard';
import SuperAdminDashboard from './pages/superAdminDashboard';
import NotificationsPage from './pages/notifications';
import SettingsPage from './pages/settings';
import UpdatePassword from './pages/resetPassword';
    
function App() {


  return (
    <Routes>
    {/* Public routes */}
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/createdoc" element={<CreateDoctor />} />
    <Route path="/verify" element={<VerifyEmail />} />
    <Route path="/forgotpass" element={<ForgotPassword />} />
    <Route path="/resetpass" element={<ResetPassword />} />
    <Route path="/loading" element={<Loading />} />
    <Route path="*" element={<NotFound />} />

    {/* Protected / Doctor Layout Routes */}
    <Route path="/doctor" element={<LayoutDoctor />}>
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="appointments" element={<AppointmentsDoctor />} />
      <Route path="appointments/create-appointment" element={<CreateAppointment />} />
      <Route path="sportNutri" element={<FoodsSports />} />
      <Route path="sportNutri/add-Food" element={<AddFood />} />
      <Route path="sportNutri/add-Sport" element={<AddSport />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="patients" element={<PatientsPage />} />
      <Route path="patients/view" element={<PatientsDetails />} />
      <Route path="reports" element={<ReportsDoctor/>} />
      <Route path="settings" element={<SettingsPage />}/>
      <Route path="settings/update-pass" element={<UpdatePassword />} />
    </Route>

     {/* Protected / Admin Layout Routes */}
     <Route path="/admin" element={<LayoutAdmin />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="appointments" element={<AppointmentsAdmin />} />
      <Route path="appointments/create-appointment" element={<CreateAppointment />} />
      <Route path="doctors" element={<DoctorsPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="patients" element={<PatientsPage />} />
      <Route path="patients/view" element={<PatientsDetails />} />
      <Route path="reports" element={<ReportsAdmin />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="settings/update-pass" element={<UpdatePassword />} />
    </Route>
  </Routes>
  )
}

export default App
