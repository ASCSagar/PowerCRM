import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authAction } from "../../../store/authStore";
import { deleteFromLocalStorage } from "../../../helpers/helperFunctions";
import { Button, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(
      authAction.setAuthStatus({
        userName: "",
        loggedIn: false,
        accessToken: null,
        refreshToken: null,
        userId: null,
        user_type: null,
        timeOfLogin: null,
        logInOperation: -1,
      })
    );
    deleteFromLocalStorage("loginInfo");
    navigate(`/login`);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-light shadow-inset rounded navbar-theme-primary">
        <div className="container-fluid position-relative">
          <div className="navbar-collapse collapse" id="navbar-dark-signin">
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand">
                  <a href="https://demo.themesberg.com/neumorphism-ui-pro/index.html">
                    <img
                      src="https://demo.themesberg.com/neumorphism-ui-pro/assets/img/brand/dark.svg"
                      alt="menuimage"
                    />
                  </a>
                </div>
                <div className="col-6 collapse-close">
                  <span
                    className="fas fa-times"
                    data-toggle="collapse"
                    role="button"
                    data-target="#navbar-dark-signin"
                    aria-controls="navbar-dark-signin"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Navbar className="">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/companies" className="navigate-link">
                  Company
                </Nav.Link>
                <Nav.Link as={NavLink} to="/sites" className="navigate-link">
                  Sites
                </Nav.Link>
                <Nav.Link as={NavLink} to="/group-sites" className="navigate-link">
                  Group Sites
                </Nav.Link>
                <Nav.Link as={NavLink} to="/quotes" className="navigate-link">
                  Quotes
                </Nav.Link>
                <Nav.Link as={NavLink} to="/group-quotes" className="navigate-link">
                  Group Quotes
                </Nav.Link>
                <Nav.Link as={NavLink} to="/notes" className="navigate-link">
                  Notes
                </Nav.Link>
              </Nav>
            </Navbar>
            <Nav.Link
              as={Button}
              onClick={logout}
              className="btn btn-primary"
              style={{ width: "85px", height: "35px" }}
            >
              Logout
            </Nav.Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
