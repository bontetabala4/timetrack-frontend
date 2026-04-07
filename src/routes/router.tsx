import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/auth/Login'

import Dashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users'
import Reports from '../pages/admin/Reports'
import QrCodes from '../pages/admin/QrCodes'

import Scan from '../pages/user/Scan'
import History from '../pages/user/History'
import Profile from '../pages/user/Profile'

import ProtectedRoute from '../guards/ProtectedRoute'
import GuestRoute from '../guards/GuestRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },

  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Reports />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/qrcodes',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <QrCodes />
      </ProtectedRoute>
    ),
  },

  {
    path: '/scan',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Scan />
      </ProtectedRoute>
    ),
  },
  {
    path: '/history',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <History />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Profile />
      </ProtectedRoute>
    ),
  },
])