import React, { useContext, useEffect } from "react";
import NavBar from "../../components/navBar";
import { getProfile } from "../../api";
import { useUser } from "../../hooks/useUser";
import { ToastContext } from "../../context/ToastContext";

function Home() {
  const { addUser } = useUser();
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  useEffect(() => {
    getProfile()
      .then((res) => {
        addUser(res.data);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات ادمین با مشکل روبرو شد");
        setMessageType("error");
      });
  }, []);
  return (
    <div>
      <NavBar />
      <div>Admin Panel</div>
    </div>
  );
}

export default Home;
