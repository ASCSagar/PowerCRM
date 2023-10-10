import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import Header from "./UI/Layouts/Header";
import Notification from "./UI/Notification";
import Shortcuts from "./General/Shortcuts";
import NavBar from "./UI/Layouts/NavBar";

function Base() {
  const isLoggedIn = useIsLoggedIn();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const [sideBarStatus, setSideBarStatus] = useState(false);

  return (
    <>
      <NavBar />
      <div
        className={`main-container  ${
          sideBarStatus && window.innerWidth > 760
            ? "sidebar-closed sbar-open"
            : ""
        } ${sideBarStatus && window.innerWidth <= 760 ? "sbar-open" : ""}`}
        id="container"
      >
        <div className="container-fluid mt-3">
          <div className="row">
            <Header />
            <Outlet />
            <Shortcuts />
          </div>
        </div>
      </div>
      <Notification />
    </>
  );
}

export default Base;
