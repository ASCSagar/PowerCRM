import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authAction } from "../../../store/authStore";
import { deleteFromLocalStorage } from "../../../helpers/helperFunctions";
import { Button, Nav, Navbar } from "react-bootstrap";
import logoimg from "../../../assets/img/powercrm.jpeg";

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
          {/* <Navbar className="justify-content-end">
            <Navbar.Brand as={NavLink} to="/" className="">
             <img src={logoimg}  alt="logo"/> PowerCRM
            </Navbar.Brand>
          </Navbar> */}
          <Navbar className="justify-content-end">
            <Navbar.Brand as={NavLink} to="/" className="">
              <img
                src={logoimg}
                alt="logo"
                style={{ width: "60px", height: "auto", marginRight: "10px" }}
                className="logo-img"
              />
             <span className="power-crm-text">PowerCRM</span>
            </Navbar.Brand>
          </Navbar>
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
                <Nav.Link as={NavLink} to="/companies">
                  Company
                </Nav.Link>
                <Nav.Link as={NavLink} to="/sites">
                  Sites
                </Nav.Link>
                <Nav.Link as={NavLink} to="/group-sites">
                  Group Sites
                </Nav.Link>
                <Nav.Link as={NavLink} to="/quotes">
                  Quotes
                </Nav.Link>
                <Nav.Link as={NavLink} to="/group-quotes">
                  Group Quotes
                </Nav.Link>
                <Nav.Link as={NavLink} to="/notes">
                  Notes
                </Nav.Link>
              </Nav>
            </Navbar>
            <Nav.Link as={Button} onClick={logout} class="btn btn-primary" style={{width:"85px",height:"35px"}}>
              Logout
            </Nav.Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
