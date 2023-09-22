import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import { getProfile } from "../../api";
// import { useUser } from "../../hooks/useUser";
import { ToastContext } from "../../context/ToastContext";
import UserTable from "../../components/user/userTable";

function Home() {
  // const { addUser } = useUser();
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  useEffect(() => {
    // getProfile()
    //   .then((res) => {
    //     addUser(res.data);
    //   })
    //   .catch((error) => {
    //     setToastMessage("دریافت اطلاعات ادمین با مشکل روبرو شد");
    //     setMessageType("error");
    //   });
  }, []);
  return (
    <NavBar>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <UserTable />
      </div>
    </NavBar>
  );
}

export default Home;
