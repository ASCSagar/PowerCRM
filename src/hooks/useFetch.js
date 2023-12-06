import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromLocalStorage,
  setToLocalStorage,
} from "../helpers/helperFunctions";
import { authAction } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { uiAction } from "../store/uiStore";

// if isAuth needed then it will be added by useFetch just make it true
const initialSendDataState = {
  url: "",
  fetchObj: "",
  notificationTime: 8,
  timeOut: 20,
  errorMsg: "",
  errTitle: "",
  expectStatusCode: [200, 201, 400],
  isAuthNeeded: false,
};

// outside function so we can use globally, -1 mean should do refresh, 1 mean all set & 0 : doing operation
let shouldRefreshToken = 1;
function useFetch() {
  // states and reducer
  const [status, setStatus] = useState({ isLoading: false, isError: false });

  //   notification time : show usr msg if taking then usual, timeOut mean : cut the connection and show user msg server down or internet connection slow...
  const [sendData, setSendData] = useState(initialSendDataState);
  const [response, setResponse] = useState(null);

  // react-router
  const navigate = useNavigate();

  // redux function
  const dispatch = useDispatch();

  // redux
  const authData = useSelector((state) => state.authStore);

  // function starts
  const fetchReq = async function (url, fetchObj) {
    const request = await fetch(
      `https://aumhealthresort.com/powercrmlatest/api/${url}`,
      fetchObj
    );
    let response = null;
    if (request.ok) {
      response = await request.json();
    }
    return { status: request.status, data: response, isError: !request.ok };
  };
  const refreshAuthToken = async function () {
    if (!authData.refreshToken) {
      return;
    }
    if (authData.logInOperation === 1) {
      // mean already refresh token thing started or token refreshed
      return;
    }
    const response = await fetchReq("token/refresh/", {
      headers: {
        // "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        refresh: authData.refreshToken,
      }),
    });
    if (response.status === 200) {
      shouldRefreshToken = 1;
      const authDataObj = {
        ...authData,
        accessToken: response.data.access,
        timeOfLogin: Date.now(),
        logInOperation: 1,
        loggedIn: true,
      };
      dispatch(authAction.setAuthStatus(authDataObj));

      setToLocalStorage("loginInfo", authDataObj, true);
    } else {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "",
          msg: `Can not authorise user, Please login again.`,
        })
      );
      dispatch(
        authAction.setAuthStatus({
          ...authData,
          accessToken: null,
          logInOperation: 1,
          loggedIn: false,
        })
      );
      deleteFromLocalStorage("loginInfo");
      navigate("/login");
    }
  };

  const ajaxRequest = async function () {
    try {
      setStatus({ isLoading: true, isError: false });

      const id = setTimeout(() => {
        dispatch(
          uiAction.setNotification({
            show: true,
            heading: "",
            msg: `Taking Longer Then Expected...`,
          })
        );
      }, sendData.notificationTime * 1000);

      const metaInfo = sendData.fetchObj;
      if (sendData.isAuthNeeded) {
        metaInfo.headers = {
          ...metaInfo.headers,
          Authorization: `Bearer ${authData.accessToken}`,
        };
      }
      const response = await fetchReq(sendData.url, metaInfo);
      clearTimeout(id);

      if (response.status === 401 && shouldRefreshToken === 1) {
        dispatch(
          uiAction.setNotification({
            show: true,
            heading: "",
            msg: `Identifying user, Please wait...`,
          })
        );
        // authorize usr again
        shouldRefreshToken = -1;
        dispatch(
          authAction.setAuthStatus({
            ...authData,
            logInOperation: 0,
          })
        );
      }
      if (response.status === 401) {
        setResponse(null);
        return;
      }
      if (sendData.expectStatusCode.includes(response.status)) {
        setResponse({
          status: response.status,
          isError: !response.ok,
          isNetwork: false,
          data: response.data,
        });
        setStatus({ isLoading: false, isError: false });
        return;
      } else {
        setStatus({ isLoading: false, isError: true });
        setResponse({
          status: response.status,
          isError: true,
          isNetwork: false,
          data: response.data,
        });
        return;
      }
      //
    } catch (e) {
      setStatus({ isLoading: false, isError: true });
      //   catch will be later
      return {
        status: null,
        isError: true,
        isNetwork: true,
        data: null,
        error: e,
      };
    }
  };

  useEffect(() => {
    // -1 mean doing nothing and 1 mean all set
    if (authData.logInOperation === 0 && shouldRefreshToken === -1) {
      // marking it false so only 1 instance will pass this test...
      shouldRefreshToken = 0;
      refreshAuthToken();
    }
  }, [authData.logInOperation, shouldRefreshToken]);

  useEffect(() => {
    // console.log("in 2 now it is", authData.logInOperation);
    // 0 means trying to refresh token
    if (
      !response &&
      !status.isError &&
      sendData.url?.length &&
      authData.logInOperation === 1 &&
      shouldRefreshToken
    ) {
      ajaxRequest();
    } else if (sendData.url === "login/") {
      ajaxRequest();
      shouldRefreshToken = true;
    }
  }, [
    sendData.url,
    authData.logInOperation,
    response,
    status.isError,
    shouldRefreshToken,
  ]);

  //   returning sendData because some values if we dont want to change then use spread and resetting response so response once used we can set again
  return [sendData, setSendData, status, response, setResponse, setStatus];
}

export default useFetch;
