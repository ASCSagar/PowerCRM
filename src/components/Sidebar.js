import React from "react";
import { Link } from "react-router-dom";
import applogo from '../assets/img/powercrm.jpeg';
import CollapsableComponent from "../components/UI/CollapsableComponent";
function NavBar(props) {
 
  return (
    <>
    <div className="sidebar-wrapper sidebar-theme" style={{width:"16%"}}>
      <nav id="sidebar">
        <div className="navbar-nav theme-brand flex-row  text-center">
          <div className="nav-logo">
            <div className="nav-item theme-text">
              <Link to="/" className="nav-link">
                <img src={applogo} alt="applogo" style={{height:"60px"}}/>
                <span style={{fontSize:"16px"}}> POWERCRM </span>
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
            <Link to="/notes" className="dropdown-toggle">
              <div className="" style={{textDecoration:"none"}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span style={{textDecoration:"none"}}>Dashboard</span>
              </div>
            </Link>
          </li>
            <li>
            <CollapsableComponent
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-clipboard"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                }
                name="Company"
                subMenu={[
                  { name: "Sites", link: "/sites" },
                  { name: "Group Sites", link: "/group-sites" },
                  { name: "Quotes", link: "/quotes" },
                  { name: "Group Quotes", link: "/group-quotes" },
                  { name: "Notes", link: "/notes" },
                ]}
                style={{ textDecoration: 'none' }}
              />
            </li>
             
        </ul>
      </nav>
    </div>
  </>
  );
}

export default NavBar;
