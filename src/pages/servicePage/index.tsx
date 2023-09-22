import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar";

import ServiceTable from "../../components/serviceTable";

const Service = () => {
  return (
    <NavBar>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ServiceTable />
      </div>
    </NavBar>
  );
};

export default Service;
