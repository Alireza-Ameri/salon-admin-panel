import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar";

import SalonTable from "../../components/salonTable";
import { ToastContext } from "../../context/ToastContext";

function Salon() {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  useEffect(() => {}, []);
  return (
    <NavBar>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <SalonTable />
      </div>
    </NavBar>
  );
}

export default Salon;
