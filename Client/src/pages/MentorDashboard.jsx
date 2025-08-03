import React from 'react';
import MentorUnifiedDashboardLayout from '../components/dashboard/MentorUnifiedDashboardLayout';

const MentorDashboard = () => {
  // Get current user name and role from localStorage
  const currentUser = localStorage.getItem('name');
  const currentUserRole = localStorage.getItem('role');

  return (
    <MentorUnifiedDashboardLayout
      currentUser={currentUser}
      currentUserRole={currentUserRole}
    />
  );
};

export default MentorDashboard; 