import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar";

import OrderTable from "../../components/orderTable";
import { ToastContext } from "../../context/ToastContext";

function Order() {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  useEffect(() => {}, []);
  return (
    <NavBar>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <OrderTable />
      </div>
    </NavBar>
  );
}

export default Order;
