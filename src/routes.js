import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdPerson,
  MdHome,
  MdMessage,
  MdFilterListAlt
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import Notifications from 'views/admin/notifications';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import ResultComponent from 'views/admin/results';

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
    name: 'Results',
    layout: '/admin',
    path: '/results',
    icon: <Icon as={MdFilterListAlt} width="20px" height="20px" color="inherit" />,
    component: <ResultComponent />,
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
