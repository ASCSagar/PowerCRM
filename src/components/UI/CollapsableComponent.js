import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function CollapsableComponent(props) {
  const [menuStatus, setMenuStatus] = useState(true);
  const location = useLocation();
  return (
    <li className="menu">
      <Link
        onClick={() => setMenuStatus((status) => !status)}
        className={`dropdown-toggle ${menuStatus ? "" : "collapsed"}`}
        aria-expanded={menuStatus}
      >
        <div className="">
          {props.svg}
          <span>{props.name}</span>
        </div>
        <div>
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
            className="feather feather-chevron-right"
          ></svg>
        </div>
      </Link>
      <ul
        className={`submenu list-unstyled collapse ${menuStatus ? "show" : ""}`}
      >
        {props.subMenu.map((menu) => (
          <li key={menu.name} className={location.pathname === menu.link ? "active" : ""}>
            <NavLink to={menu.link}> {menu.name} </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default CollapsableComponent;
