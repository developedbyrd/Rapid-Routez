import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import DriverRegister from "./components/auth/driver/DriverRegister";
import Header from "./components/header/Header";
import Home from "./components/pages/home/Home";
import SearchRide from "./components/pages/SearchRide/SearchRide";
import CreateRide from "./components/pages/CreateRide/CreateRide";
import Rides from "./components/pages/Rides/Rides";
import DriverPortal from "./components/pages/Driver/Driver";

import { AuthProvider, useAuth } from "./contexts/authContext/AuthContext";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { handleGoogleRedirectResult } from "./firebase/auth";
import toast from "react-hot-toast";

function App() {
  const { setCurrentUser } = useAuth();

  const routesArray = [
    {
      path: "*",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/SearchRide",
      element: <SearchRide />,
    },
    {
      path: "/CreateRide",
      element: <CreateRide />,
    },
    {
      path: "/Rides",
      element: <Rides />,
    },
    {
      path: "/DriverRegister",
      element: <DriverRegister />,
    },
    {
      path: "/DriverPortal",
      element: <DriverPortal />,
    },
  ];
  let routesElement = useRoutes(routesArray);

  useEffect(() => {
    handleGoogleRedirectResult()
      .then((result) => {
        if (result) {
          console.log("Logged in:", result.user);
          setCurrentUser(result.user); // Update auth context
        }
      })
      .catch((error) => {
        console.error("Redirect Error:", error);
        toast.error(`Login failed: ${error.message}`);
      });
  }, []);

  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
