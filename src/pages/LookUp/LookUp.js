import React, { useState } from "react";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import { Button, Form } from "react-bootstrap";
import SelectSearch from "react-select-search";
import { useSelector } from "react-redux";

const LookUp = () => {
  const authData = useSelector((state) => state.authStore);

  const [formData, setFormData] = useState({
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
  });

  const [apiData, setApiData] = useState([]);

  let token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImFmODU2ZDA0LWFjZDAtNDU2NC1iYjBjLWJlMjk0NGY3MWQ5MiIsInN1YiI6InNydWphbkB3aW5wb3dlcmRpcmVjdC5jby51ayIsImVtYWlsIjoic3J1amFuQHdpbnBvd2VyZGlyZWN0LmNvLnVrIiwianRpIjoiOGFhZjZmYmMtNmQ1Yy00ZWJlLWFhMDMtMWM2MTJjMDhiYzkzIiwibmJmIjoxNzAxMTY0ODQ3LCJleHAiOjE3MDExNjUxNDcsImlhdCI6MTcwMTE2NDg0NywiaXNzIjoiRW5lcmd5IExvb2t1cCIsImF1ZCI6Imh0dHBzOi8vYXBpLmxvb2t1cC5FbmVyZ3kifQ.JbdZtALXMcZ3fQDzjNVPvOZ6OdahniESXqk4u08TiCqiLyaD9_i9qf_41IO98dFN8dJexP3yqumONvV3cY26Jw";

  const jsonData = JSON.stringify({
    query: "SW19 2RR",
    isQueryTicket: true,
  });

  const fetchData = async () => {
    try {
      let response = await fetch("/api/Property/SearchByPostcode", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: jsonData,
        redirect: "follow",
      });
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("---Error--->", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  console.log("--APIData--->", apiData);
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
                value={formData.lType}
                onChange={(val) => setFormData({ ...formData, lType: val })}
              ></SelectSearch>
            </Form.Group>
            <Form.Group className="col-md-3 selectbox">
              <Form.Label className="text-center itsBlock">
                Search By
              </Form.Label>
              <SelectSearch
                options={
                  formData.lType === "Company"
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
                value={formData.l_company_search}
                onChange={(val) =>
                  setFormData({ ...formData, l_company_search: val })
                }
              ></SelectSearch>
            </Form.Group>
            {formData.l_company_search === "c_name" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Company Name"
                  value={formData.c_name}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, c_name: e.target.value };
                    })
                  }
                />
              </Form.Group>
            )}
            {formData.l_company_search === "c_number" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  name="Company Number"
                  value={formData.c_number}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, c_number: e.target.value };
                    })
                  }
                />
              </Form.Group>
            )}
            {formData.l_company_search === "c_name_postcode" && (
              <>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Company Name"
                    value={formData.c_name_postcode}
                    onChange={(e) =>
                      setFormData((prev) => {
                        return { ...prev, c_name_postcode: e.target.value };
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="Company Postcode and Name"
                    value={formData.c_postcode}
                    onChange={(e) =>
                      setFormData((prev) => {
                        return { ...prev, c_postcode: e.target.value };
                      })
                    }
                  />
                </Form.Group>
              </>
            )}
            {formData.l_company_search === "s_postcode" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                  type="number"
                  name="Site Postcode"
                  value={formData.s_postcode}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, s_postcode: e.target.value };
                    })
                  }
                />
              </Form.Group>
            )}
            {formData.l_company_search === "s_name_number" && (
              <>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Name/Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Site Name/Number"
                    value={formData.s_name_number}
                    onChange={(e) =>
                      setFormData((prev) => {
                        return { ...prev, s_name_number: e.target.value };
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="Site Street"
                    value={formData.s_street}
                    onChange={(e) =>
                      setFormData((prev) => {
                        return { ...prev, s_street: e.target.value };
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-1 col-md-3">
                  <Form.Label>Town</Form.Label>
                  <Form.Control
                    type="text"
                    name="Site Town"
                    value={formData.s_town}
                    onChange={(e) =>
                      setFormData((prev) => {
                        return { ...prev, s_town: e.target.value };
                      })
                    }
                  />
                </Form.Group>
              </>
            )}
            {formData.l_company_search === "s_m_bNumber" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>MPAN Bottom Line</Form.Label>
                <Form.Control
                  type="number"
                  name="Site MPAN Bottom Line"
                  value={formData.s_m_bNumber}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, s_m_bNumber: e.target.value };
                    })
                  }
                />
              </Form.Group>
            )}
            {formData.l_company_search === "s_e_serialNumber" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Electricity Serial Number</Form.Label>
                <Form.Control
                  type="number"
                  name="Site Electricity Serial Number"
                  value={formData.s_e_serialNumber}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, s_e_serialNumber: e.target.value };
                    })
                  }
                />
              </Form.Group>
            )}
            {formData.l_company_search === "s_g_serialNumber" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>Gas Serial Number</Form.Label>
                <Form.Control
                  type="number"
                  name="Site Gas Serial Number"
                  value={formData.s_g_serialNumber}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, s_g_serialNumber: e.target.value };
                    })
                  }
                />
              </Form.Group>
            )}
            {formData.l_company_search === "s_mprn" && (
              <Form.Group className="mt-1 col-md-3">
                <Form.Label>MPRN</Form.Label>
                <Form.Control
                  type="number"
                  name="Site MPRN"
                  value={formData.s_mprn}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, s_mprn: e.target.value };
                    })
                  }
                />
              </Form.Group>
            )}
            <div className="mt-3 col-md-12 text-center">
              <Button onClick={handleSubmit} variant="primary" type="submit">
                Search
              </Button>
            </div>
          </div>
        </Form>
      </NeumorphismWrapper>
    </>
  );
};

export default LookUp;
