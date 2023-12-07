import React, { useEffect, useReducer, useState } from "react";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import { Button, Form } from "react-bootstrap";
import SelectSearch from "react-select-search";
import useFetch from "../../hooks/useFetch";
import { uiAction } from "../../store/uiStore";
import { useDispatch } from "react-redux";

const initialDetails = {
  lType: "Company",
  l_company_search: "",
  c_name: "",
  c_number: "",
  c_name_postcode: "",
  c_postcode: "",
  s_postcode: "",
  s_name_number: "",
  s_street: "",
  s_town: "",
  s_m_bNumber: "",
  s_e_serialNumber: "",
  s_g_serialNumber: "",
  s_mprn: "",
};

const reducer = (state, action) => {
  if (action?.reset) {
    return action.value;
  }
  return { ...state, [action.type]: action.value };
};

const LookUp = () => {
  const [apiData, dispatchapiData] = useReducer(reducer, initialDetails);
  const [data, setData] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  console.log("---ApiData---->", data);

  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    postcodeData,
    setPostCodeData,
  ] = useFetch();

  const jsonData = JSON.stringify({
    query: apiData.s_postcode,
    isQueryTicket: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiData.s_postcode) {
      setErr("Site Postcode is Required");
      return;
    } else if (err?.length) {
      setErr("");
    }
    setSendReqData({
      ...sendReqData,
      url: "lookup/Property/SearchByPostcode/",
      fetchObj: {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonData,
      },
      isAuthNeeded: true,
      expectStatusCode: [200, 201],
    });
  };

  useEffect(() => {
    if (postcodeData) {
      if (postcodeData.status === 200 || postcodeData.status === 201) {
        dispatch(
          uiAction.setNotification({
            show: true,
            heading: "Search",
            msg: "Search Successfull",
          })
        );
        setData(postcodeData?.data);
        dispatchapiData({ reset: true, value: initialDetails });
      }
    }
  }, [postcodeData]);

  return (
    <>
      <NeumorphismWrapper>
        <Form>
          <div className="row">
            <Form.Group className="col-md-3 selectbox">
              <Form.Label className="text-center itsBlock">
                LookUp Type
              </Form.Label>
              <SelectSearch
                options={[
                  {
                    name: "Company",
                    value: "Company",
                  },
                  {
                    name: "Site",
                    value: "Site",
                  },
                ]}
                value={apiData.lType}
                onChange={(value) =>
                  dispatchapiData({
                    type: "lType",
                    value: value,
                  })
                }
              ></SelectSearch>
            </Form.Group>
            <Form.Group className="col-md-3 selectbox">
              <Form.Label className="text-center itsBlock">
                Search By
              </Form.Label>
              <SelectSearch
                options={
                  apiData.lType === "Company"
                    ? [
                        {
                          name: "Company Name",
                          value: "c_name",
                        },
                        {
                          name: "Company Number",
                          value: "c_number",
                        },
                        {
                          name: "Company Name and Postcode",
                          value: "c_name_postcode",
                        },
                      ]
                    : [
                        {
                          name: "Postcode",
                          value: "s_postcode",
                        },
                        {
                          name: "Address",
                          value: "s_name_number",
                        },
                        {
                          name: "MPAN Bottom Line",
                          value: "s_m_bNumber",
                        },
                        {
                          name: "Electricity Serial Number",
                          value: "s_e_serialNumber",
                        },
                        {
                          name: "Gas Serial Number",
                          value: "s_g_serialNumber",
                        },
                        {
                          name: "MPRN",
                          value: "s_mprn",
                        },
                      ]
                }
                value={apiData.l_company_search}
                onChange={(e) =>
                  dispatchapiData({
                    type: "l_company_search",
                    value: e,
                  })
                }
              ></SelectSearch>
            </Form.Group>
            {apiData.l_company_search === "c_name" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Company Name"
                  value={apiData.c_name}
                  onChange={(e) =>
                    dispatchapiData({
                      type: "c_name",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}
            {apiData.l_company_search === "c_number" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  name="Company Number"
                  value={apiData.c_number}
                  onChange={(e) =>
                    dispatchapiData({
                      type: "c_number",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}
            {apiData.l_company_search === "c_name_postcode" && (
              <>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Company Name"
                    value={apiData.c_name_postcode}
                    onChange={(e) =>
                      dispatchapiData({
                        type: "c_name_postcode",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="Company Postcode and Name"
                    value={apiData.c_postcode}
                    onChange={(e) =>
                      dispatchapiData({
                        type: "c_postcode",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </>
            )}
            {apiData.l_company_search === "s_postcode" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                  type="text"
                  name="Site Postcode"
                  value={apiData.s_postcode}
                  onChange={(e) =>
                    dispatchapiData({
                      type: "s_postcode",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}
            {apiData.l_company_search === "s_name_number" && (
              <>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Name/Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Site Name/Number"
                    value={apiData.s_name_number}
                    onChange={(e) =>
                      dispatchapiData({
                        type: "s_name_number",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="Site Street"
                    value={apiData.s_street}
                    onChange={(e) =>
                      dispatchapiData({
                        type: "s_street",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Town</Form.Label>
                  <Form.Control
                    type="text"
                    name="Site Town"
                    value={apiData.s_town}
                    onChange={(e) =>
                      dispatchapiData({
                        type: "s_town",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </>
            )}
            {apiData.l_company_search === "s_m_bNumber" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>MPAN Bottom Line</Form.Label>
                <Form.Control
                  type="number"
                  name="Site MPAN Bottom Line"
                  value={apiData.s_m_bNumber}
                  onChange={(e) =>
                    dispatchapiData({
                      type: "s_m_bNumber",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}
            {apiData.l_company_search === "s_e_serialNumber" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Electricity Serial Number</Form.Label>
                <Form.Control
                  type="number"
                  name="Site Electricity Serial Number"
                  value={apiData.s_e_serialNumber}
                  onChange={(e) =>
                    dispatchapiData({
                      type: "s_e_serialNumber",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}
            {apiData.l_company_search === "s_g_serialNumber" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Gas Serial Number</Form.Label>
                <Form.Control
                  type="number"
                  name="Site Gas Serial Number"
                  value={apiData.s_g_serialNumber}
                  onChange={(e) =>
                    dispatchapiData({
                      type: "s_g_serialNumber",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}
            {apiData.l_company_search === "s_mprn" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>MPRN</Form.Label>
                <Form.Control
                  type="number"
                  name="Site MPRN"
                  value={apiData.s_mprn}
                  onChange={(e) =>
                    dispatchapiData({
                      type: "s_mprn",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}
            <div className="mt-3 col-md-12 text-center">
              {err?.length ? <p className="dengor">{err}</p> : ""}
              <Button onClick={handleSubmit} variant="primary" type="submit">
                {reqStatus.isLoading ? "Searching" : "Search"}
              </Button>
            </div>
          </div>
        </Form>
      </NeumorphismWrapper>
    </>
  );
};

export default LookUp;
