import React, { useState, useReducer, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Form/Button";
import InputBox from "../components/UI/Form/InputBox";
import Notification from "../components/UI/Notification";
import { setToLocalStorage } from "../helpers/helperFunctions";
import { Form } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import { uiAction } from "../store/uiStore";
import { authAction } from "../store/authStore";
import logologin from '../assets/img/powercrm.jpeg';

const InitialState = {
  userName: "",
  password: "",
  forgotEmail: "",
  submitBtn: "Login",
  resetBtn: "Click to get reset link",
};

const reducer = (state, action) => {
  // state[action.type] = action.value;
  return { ...state, [action.type]: action.value };
};

function Login() {
  // state and reducer hooks
  //   to toggle b/w forget pass and login
  const [loginFormStatus, setLoginFormStatus] = useState(true);
  const [errorLogin, setErrorLogin] = useState("");

  //   custom hook for ajax calls
  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();

  // dispatch redux store
  const dispatch = useDispatch();

  //   reducers
  const [formData, dispatchInputChange] = useReducer(reducer, InitialState);

  //   router hooks
  const navigate = useNavigate();
  // const navigateWithError = useNavigateWithError();

  //   toggle b/w login and forget pass
  const changeForm = () => {
    setLoginFormStatus((status) => !status);
  };

  const doLogin = async (e) => {
    e.preventDefault();
    if (!formData.userName?.length && !formData.password?.length) {
      setErrorLogin("Username and password can't be empty");
      return;
    }
    if (!formData.userName?.length) {
      setErrorLogin("Username can't be empty");
      return;
    }
    if (!formData.password?.length) {
      setErrorLogin("Password can't be empty");
      return;
    }
    dispatchInputChange({
      type: "submitBtn",
      value: "Logging In",
    });
    let body = {
      username: formData.userName,
      password: formData.password,
    };

    if (responseData) setResponseData(null);

    setSendReqData({
      ...sendReqData,
      url: "login/",
      fetchObj: {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
      expectStatusCode: [404, 400, 200],
    });
  };

  //  we did the req in doLogin now status will be changed through useEffect
  useEffect(() => {
    if (responseData) {
      dispatchInputChange({
        type: "submitBtn",
        value: "Login",
      });
      if (responseData.status === 404) {
        setErrorLogin("Username or Password is wrong, Please try again...");
      }
      if (responseData.status === 400) {
        setErrorLogin("Please check username and Password");
      }

      if (responseData.status === 200) {
        dispatch(
          uiAction.setNotification({
            show: true,
            heading: `${formData.userName}`,
            msg: `Welcome To PowerCRM`,
          })
        );

        const loginObj = {
          userName: formData.userName,
          loggedIn: true,
          accessToken: responseData.data.token.access,
          refreshToken: responseData.data.token.refresh,
          user_type: responseData.data.user_status,
          userId: responseData.data.userid,
          timeOfLogin: Date.now(),
          logInOperation: 1,
        };
        dispatch(authAction.setAuthStatus(loginObj));
        setToLocalStorage("loginInfo", loginObj, true);
        navigate(`/`);
      }
    }
  }, [responseData]);
  return (
    <>
      <div className="form">
        <div className="auth-container">
          <h1
            className="text-center"
            style={{ marginBottom: "100px", marginTop: "50px" }}
          >
            Welcome To PowerCRM
          </h1>
          <div className="container mx-auto align-self-center">
            <div className="row ">
              <div className="col-md-12 col-12 d-flex flex-row align-self-center mx-auto flexCols">
                <div className="text-center loginlogo" >
                  <img src={logologin}  alt="logo"/>
                  <h1>PowerCRM</h1>
                </div>
                <div className="card mt-3 mb-3 neumorphism-box nmb">
                  <div className="card-body">
                    <div className="row ">
                      {loginFormStatus ? (
                        <>
                          <div className="col-md-12 mb-3">
                            <h2 className="text-center">Log In</h2>
                            <p className="text-center">
                              Enter your email and password to login
                            </p>
                          </div>
                          <Form>
                            <div className="col-md-12">
                              <InputBox
                                divClassName="mb-3"
                                label="UserName"
                                type="text"
                                required={true}
                                value={formData.userName}
                                onChange={dispatchInputChange}
                                reducerName="userName"
                              />
                            </div>
                            <div className="col-12">
                              <InputBox
                                divClassName="mb-4"
                                label="Password"
                                type="password"
                                required={true}
                                value={formData.password}
                                onChange={dispatchInputChange}
                                reducerName="password"
                              />
                              {errorLogin.length ? (
                                <p style={{ color: "red" }}>{errorLogin}</p>
                              ) : (
                                ""
                              )}

                              <div className="text-center">
                                <p className="forgotPass" onClick={changeForm}>
                                  Forgot Password?
                                </p>
                              </div>
                            </div>

                            <div className="col-12">
                              <Button
                                divClassName="mb-4"
                                btnClassName="btn w-100"
                                style={{backgroundColor:"#0097b2"}}
                                onClick={doLogin}
                                btnLabel={formData.submitBtn}
                                disabled={reqStatus.isLoading}
                              />
                            </div>
                          </Form>
                        </>
                      ) : (
                        <div>
                          <div className="col-md-12 mb-3">
                            <h2 className="text-center">Forgot Password</h2>
                            <p>
                              Enter your email id to get reset Password link
                            </p>
                          </div>
                          <div className="col-md-12">
                            <InputBox
                              divClassName="mb-3"
                              label="Email"
                              type="email"
                              required={true}
                              value={formData.forgotEmail}
                              onChange={dispatchInputChange}
                              reducerName="forgotEmail"
                            />
                          </div>
                          <div className="col-12">
                            <div className="text-center">
                              <p
                                className="forgotPass"
                                onClick={changeForm}
                              >
                                Return To Login Form
                              </p>
                            </div>
                          </div>
                          <div className="col-12">
                            <Button
                              divClassName="mb-4"
                              btnClassName="btn btn-secondary w-100"
                              btnLabel={formData.resetBtn.text}
                              disabled={formData.resetBtn.status ? true : false}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </>
  );
}

export default Login;
