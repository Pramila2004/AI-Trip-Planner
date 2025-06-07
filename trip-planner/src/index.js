import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/AuthContext';

import Header from './components/Header/Header';
import App from './App';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyTrips from './pages/MyTrips';
import ViewTrip from './pages/ViewTrip';

// Create a layout wrapper to include Header and outlet for nested routes
const RootLayout = () => (
  <AuthContextProvider>
    <Header />
    <Toaster position="top-center" reverseOrder={false} />
    <Outlet /> {/* nested routes render here */}
  </AuthContextProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,  // layout component with header and auth provider
    children: [
      { index: true, element: <App /> },  // default path "/"
      { path: "create-trip", element: <CreateTrip /> },
      { path: "trip-details", element: <TripDetails /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "my-trips", element: <MyTrips /> },
      { path: "view-trip/:id", element: <ViewTrip /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
