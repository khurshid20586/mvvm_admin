import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdMessage,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import Notifications from 'views/admin/notifications';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Notifications',
    layout: '/admin',
    path: '/notifications',
    icon: (
      <Icon
        as={MdMessage}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Notifications />,
    secondary: true,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Auth',
    layout: '/auth',
    path: '/signIn',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
    showInSidebar: false, // Added property to exclude from sidebar
  }
];

export default routes;
