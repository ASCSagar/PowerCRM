import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
  const location = useLocation().pathname;

  const breadcrumb = () => {
    if (location === "/") return "Home";
    let currentLink = "";
    const path = location
      .split("/")
      .filter((path) => path.length !== 0)
      .map((crumb, index) => {
        let newCrumb;
        if (index > 0)
          newCrumb = ` / ${crumb[0].toUpperCase() + crumb.substring(1)}`;
        else newCrumb = crumb[0].toUpperCase() + crumb.substring(1);
        currentLink += `/${crumb}`;
        return <Link to={currentLink}>{newCrumb}</Link>;
      });
    path.unshift(<Link to="/">Home / </Link>);
    return path;
  };

  return (
    <>
      <div className="main-content">
        <header className="header breadcrumb navbar navbar-expand-sm expand-header">
          <div className="search-animated toggle-search">
            <span className="badge badge-secondary">{breadcrumb()}</span>
          </div>
          {location === "/group-quotes" ? (
            <div className="text-right mb-3">
              <Link to="/group-quotes/add" className="btn" style={{backgroundColor:"#0097b2"}}>
                Add Group Quotes
              </Link>
            </div>
          ) : (
            ""
          )}
        </header>
      </div>
    </>
  );
}

export default Header;
