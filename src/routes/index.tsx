import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from 'components/ProtectedRoute';

import ApplicationLogs from './ApplicationLogs';
import BuildLogs from './BuildLogs';
import Dashboard from './Dashboard';
import Deployment from './Deployment';
import Deployments from './Deployments';
import Installation from './Installation';
import Installations from './Installations';
import Login from './Login';
import Repositories from './Repositories';
import Repository from './Repository';
import RouteNotFound from './RouteNotFound';
import Settings from './Settings';
import Signup from './Signup';
import User from './User';
import Users from './Users';

const router = createBrowserRouter([
  {
    path: '*',
    element: <RouteNotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:userId',
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: '/deployments',
    element: (
      <ProtectedRoute>
        <Deployments />
      </ProtectedRoute>
    ),
  },
  {
    path: '/deployments/:deploymentId',
    element: (
      <ProtectedRoute>
        <Deployment />
      </ProtectedRoute>
    ),
  },
  {
    path: '/deployments/:deploymentId/build-logs',
    element: (
      <ProtectedRoute>
        <BuildLogs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/deployments/:deploymentId/application-logs',
    element: (
      <ProtectedRoute>
        <ApplicationLogs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/repositories',
    element: (
      <ProtectedRoute>
        <Repositories />
      </ProtectedRoute>
    ),
  },
  {
    path: '/repositories/:repositoryId',
    element: (
      <ProtectedRoute>
        <Repository />
      </ProtectedRoute>
    ),
  },
  {
    path: '/installations',
    element: (
      <ProtectedRoute>
        <Installations />
      </ProtectedRoute>
    ),
  },
  {
    path: '/installations/:installationId',
    element: (
      <ProtectedRoute>
        <Installation />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
