import React, { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/login";
import Service from "./pages/servicePage";
import CreateService from "./pages/servicePage/createService";
import Order from "./pages/order";

type Props = {};

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const Routes = (props: Props) => {
  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/create-service" element={<CreateService />} />
        <Route path="/order" element={<Order />} />
      </Route>
    </Router>
  );
};

export default Routes;
