import React from 'react';
import UnifiedDashboardLayout from '../components/dashboard/UnifiedDashboardLayout';

const Dashboard = () => {
  // Get current user name and role from localStorage
  const currentUser = localStorage.getItem('name');
  const currentUserRole = localStorage.getItem('role');

  return (
    <UnifiedDashboardLayout
      currentUser={currentUser}
      currentUserRole={currentUserRole}
    />
  );
};

export default Dashboard; 