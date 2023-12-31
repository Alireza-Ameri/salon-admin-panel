import React, { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/login";
import Service from "./pages/servicePage";
import CreateService from "./pages/servicePage/createService";
import EditService from "./pages/servicePage/editService";
import Order from "./pages/order";
import Salon from "./pages/salon";

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
        <Route path="/edit-service/:id" element={<EditService />} />
        <Route path="/order" element={<Order />} />
        <Route path="/salon" element={<Salon />} />
      </Route>
    </Router>
  );
};

export default Routes;
