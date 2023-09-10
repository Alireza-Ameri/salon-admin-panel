import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import { getProfile } from "../../api";

import { ToastContext } from "../../context/ToastContext";


function Service() {

  const { setToastMessage, setMessageType } = useContext(ToastContext);
  useEffect(() => {

  }, []);
  return (
    <div>
      <NavBar />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        services
      </div>
    </div>
  );
}

export default Service;
