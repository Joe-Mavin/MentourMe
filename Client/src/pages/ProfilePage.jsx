import React from 'react';
import UnifiedDashboardLayout from '../components/dashboard/UnifiedDashboardLayout';

const ProfilePage = () => {
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

export default ProfilePage; 