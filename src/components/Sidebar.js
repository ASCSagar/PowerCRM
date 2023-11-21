import React from "react";
import { Link,useLocation } from "react-router-dom";
import applogo from "../assets/img/powercrm.jpeg";
const NavBar = (props) => {
  const location = useLocation();
  return (
    <>
      <div className="sidebar-wrapper sidebar-theme sidebar-width">
        <nav id="sidebar">
          <div className="navbar-nav theme-brand flex-row  text-center">
            <div className="nav-logo">
              <div className="nav-item theme-text">
                <Link to="/" className="nav-link">
                  <img src={applogo} alt="applogo" className="sidebar-logo" />
                  <span className="sidebar-logo-text"> POWERCRM </span>
                </Link>
              </div>
            </div>
            <div className="nav-item sidebar-toggle">
              <div
                className="btn-toggle sidebarCollapse"
                onClick={() => props.sidebarStateChange((state) => !state)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevrons-left"
                >
                  <polyline points="11 17 6 12 11 7"></polyline>
                  <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <ul className="list-unstyled menu-categories" id="accordionExample">
            <li className="menu">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''} dropdown-toggle`}>
                <div className="span-option" >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-home"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Dashboard</span>
                </div>
              </Link>
            </li>
            <li className="menu">
              <Link to="/companies" className={`nav-link ${location.pathname === '/companies' ? 'active' : ''} dropdown-toggle`}>
                <div className="span-option">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-clipboard "
                  >
                    <path d="M16 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM15 0H5a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                    <rect x="8" y="4" width="8" height="4"></rect>
                    <path d="M8 0v4"></path>
                  </svg>
                  <span>Company</span>
                </div>
              </Link>
            </li>
            <li>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
