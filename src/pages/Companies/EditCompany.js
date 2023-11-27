import React, { useEffect, useReducer, useState } from "react";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import SelectionBox from "../../components/Form/SelectionBox";
import SelectSearch from "react-select-search";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingData from "../../components/UI/LoadingData";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";

const initialSiteState = {
  accountName: "",
  accountNo: "",
  address: "",
  addressline1Company: "",
  addressline2Company: "",
  addressline3Company: "",
  bankName: "",
  business_type: "",
  countryOfCompany: "",
  creditScore: "",
  estimatedTurnover: "",
  homePostCode: "",
  isMacroBusiness: false,
  name: "",
  parentCompany: "",
  reference: "",
  numberOfEmployees: "",
  partnerDob: "",
  partnerName: "",
  postCode: "",
  registrationNo: "",
  shortCode: "",
  sic_code: "",
  timeAtAddressMonths: "",
  timeAtAddressYears: "",
};

const CompanyReducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }

  let returnedObj = { ...state, [action.type]: action.value };
  if (returnedObj.isBillingSiteSame) {
    returnedObj = {
      ...returnedObj,
      billingAddressLine1: returnedObj.siteAddressLine1,
      billingAddressLine2: returnedObj.siteAddressLine2,
      billingAddressLine3: returnedObj.siteAddressLine3,
      billingAddressLine4: returnedObj.siteAddressLine4,
      billingCountry: returnedObj.siteCountry,
      billingPostCode: returnedObj.sitePostCode,
    };
  }
  return returnedObj;
};

const turnaryOperation = function (data) {
  return data ?? "";
};

function EditCompany() {
  const [companyData, dispatchInputChange] = useReducer(
    CompanyReducer,
    initialSiteState
  );
  const navigate = useNavigate();
  const [key, setKey] = useState(0);
  const [err, setErr] = useState("");

  const paramsId = useParams().editId;

  const [
    sendcompanyData,
    setCompanyReqData,
    reqCompanyStatus,
    responsecompanyData,
    setCompanyResponseData,
    setStatus,
  ] = useFetch();

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if (paramsId && !responseGetcompanyData) {
      setCompanyGETData({
        ...companyGETData,
        url: `company/${paramsId}/`,
        fetchObj: {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
        isAuthNeeded: true,
        expectStatusCode: [200, 201],
      });
    }
    if (responseGetcompanyData) {
      const responseData = {
        accountName: turnaryOperation(responseGetcompanyData.data.account_name),
        accountNo: turnaryOperation(responseGetcompanyData.data.account_no),
        address: turnaryOperation(responseGetcompanyData.data.address),
        bankName: turnaryOperation(responseGetcompanyData.data.bank_name),
        business_type: turnaryOperation(
          responseGetcompanyData.data.business_type
        ),
        countryOfCompany: turnaryOperation(
          responseGetcompanyData.data.country_of_company
        ),
        creditScore: turnaryOperation(responseGetcompanyData.data.credit_score),
        estimatedTurnover: turnaryOperation(
          responseGetcompanyData.data.estimated_turnover
        ),
        homePostCode: turnaryOperation(
          responseGetcompanyData.data.home_post_code
        ),
        isMacroBusiness: turnaryOperation(
          responseGetcompanyData.data.is_macro_business
        ),
        name: turnaryOperation(responseGetcompanyData.data.name),
        parentCompany: turnaryOperation(
          responseGetcompanyData.data.parent_company
        ),
        reference: turnaryOperation(responseGetcompanyData.data.reference),
        numberOfEmployees: turnaryOperation(
          responseGetcompanyData.data.number_of_employees
        ),
        partnerDob: turnaryOperation(responseGetcompanyData.data.partner_dob),
        partnerName: turnaryOperation(responseGetcompanyData.data.partner_name),
        postCode: turnaryOperation(responseGetcompanyData.data.postcode),
        registrationNo: turnaryOperation(
          responseGetcompanyData.data.registration_no
        ),
        shortCode: turnaryOperation(responseGetcompanyData.data.shortcode),
        sic_code: turnaryOperation(responseGetcompanyData.data.sic_code),
        timeAtAddressMonths: turnaryOperation(
          responseGetcompanyData.data.time_at_address_months
        ),
        timeAtAddressYears: turnaryOperation(
          responseGetcompanyData.data.time_at_address_years
        ),
        addressline1Company: turnaryOperation(
          responseGetcompanyData.data?.addressline1_company
        ),
        addressline2Company: turnaryOperation(
          responseGetcompanyData.data?.addressline2_company
        ),
        addressline3Company: turnaryOperation(
          responseGetcompanyData.data?.addressline3_company
        ),
        isBillingSiteSame: false,
        firstName: turnaryOperation(
          responseGetcompanyData.data.contacts?.first_name
        ),
        lastName: turnaryOperation(
          responseGetcompanyData.data.contacts?.last_name
        ),
        contactTitle: turnaryOperation(
          responseGetcompanyData.data.contacts?.contact_title
        ),
        position: turnaryOperation(
          responseGetcompanyData.data.contacts?.position
        ),
        telephoneNumber: turnaryOperation(
          responseGetcompanyData.data.contacts?.telephone_number
        ),
        email: turnaryOperation(responseGetcompanyData.data.contacts?.email),
      };
      dispatchInputChange({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseGetcompanyData]);

  const handleSelectionChange = (fileName, file) => {
    dispatchInputChange({ type: fileName, value: file });
  };

  const editCompany = function (e) {
    e.preventDefault();
    if (!companyData.estimatedTurnover) {
      setErr("Estimated Turnover is Required");
      return;
    } else if (!companyData.numberOfEmployees) {
      setErr("Number Of Employees is Required");
      return;
    } else if (!companyData.partnerDob) {
      setErr("Partner DOB is Required");
      return;
    } else if (!companyData.postCode) {
      setErr("Postcode is Required");
      return;
    } else if (!companyData.timeAtAddressMonths) {
      setErr("Time At Address (Months) is Required");
      return;
    } else if (!companyData.timeAtAddressYears) {
      setErr("Time At Address (Years) is Required");
      return;
    } else if (err?.length) {
      setErr("");
    }
    let sendData = {
      account_name: companyData.accountName,
      account_no: companyData.accountNo,
      address: companyData.address,
      bank_name: companyData.bankName,
      business_type: companyData.business_type,
      country_of_company: companyData.countryOfCompany,
      credit_score: companyData.creditScore,
      estimated_turnover: companyData.estimatedTurnover,
      home_post_code: companyData.homePostCode,
      is_macro_business: companyData.isMacroBusiness,
      name: companyData.name,
      parent_company: companyData.parentCompany,
      reference: companyData.reference,
      number_of_employees: companyData.numberOfEmployees,
      partner_dob: companyData.partnerDob,
      partner_name: companyData.partnerName,
      postcode: companyData.postCode,
      registration_no: companyData.registrationNo,
      shortcode: companyData.shortCode,
      sic_code: companyData.sic_code,
      time_at_address_months: companyData.timeAtAddressMonths,
      time_at_address_years: companyData.timeAtAddressYears,
      addressline1_company: companyData.addressline1Company,
      addressline2_company: companyData.addressline2Company,
      addressline3_company: companyData.addressline3Company,
    };
    const contactInfo = {
      contacts: {
        first_name: companyData.firstName,
        last_name: companyData.lastName,
        contact_title: companyData.contactTitle,
        position: companyData.position,
        telephone_number: companyData.telephoneNumber,
        email: companyData.email,
      },
    };
    if (
      contactInfo.contacts.first_name ||
      contactInfo.contacts.last_name ||
      contactInfo.contacts.contact_title ||
      contactInfo.contacts.position ||
      contactInfo.contacts.telephone_number ||
      contactInfo.contacts.email
    ) {
      sendData = { ...sendData, ...contactInfo };
    }
    setCompanyResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setCompanyReqData({
      ...sendcompanyData,
      url: `company/${paramsId}/`,
      fetchObj: {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      },
      isAuthNeeded: true,
      expectStatusCode: [200, 201],
    });
  };

  useEffect(() => {
    if (responsecompanyData) {
      if (
        responsecompanyData.status === 200 ||
        responsecompanyData.status === 201
      ) {
        navigate("/companies");
      }
    }
  }, [responsecompanyData]);

  if (reqGetCompanyStatus.isLoading) {
    return <LoadingData className="text-center" />;
  }

  const changeTab = function (isNext = true) {
    setKey((oldKey) => {
      return isNext ? oldKey + 1 : oldKey - 1;
    });
  };

  return (
    <>
      <NeumorphismWrapper>
        <div className="widget-header">
          <h4>Company Details</h4>
        </div>
        <div id="tabsSimple" className=" layout-spacing"></div>
        <Form onSubmit={editCompany}>
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(+k)}
            id="controlled-tab-example"
            className="mb-3"
          >
            <Tab eventKey={0} title="Company Info">
              <Form.Group className="mb-3 col-12" controlId="name">
                <Form.Label>Company Name</Form.Label>
                <Link to="/lookup" className="ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </Link>
                <Form.Control
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "name",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="parentCompany">
                <Form.Label>Parent Company</Form.Label>
                <Form.Control
                  type="text"
                  name="parentCompany"
                  value={companyData.parentCompany}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "parentCompany",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="reference">
                <Form.Label>Reference</Form.Label>
                <Form.Control
                  type="text"
                  name="reference"
                  value={companyData.reference}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "reference",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="numberOfEmployees">
                <Form.Label>Number Of Employees</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfEmployees"
                  value={companyData.numberOfEmployees}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "numberOfEmployees",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="registrationNo">
                <Form.Label>Registration Number</Form.Label>
                <Link to="/lookup" className="ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </Link>
                <Form.Control
                  type="text"
                  name="registrationNo"
                  className="mb-3"
                  value={companyData.registrationNo}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "registrationNo",
                      value: e.target.value,
                    })
                  }
                />
                <SelectionBox
                  groupclassName="mb-3 col-md-6 selectbox"
                  groupId="business_type"
                  label="Company Type"
                  value={companyData.business_type}
                  onChange={handleSelectionChange.bind(null, "business_type")}
                  name="business_type"
                  isSearch={true}
                  objKey="name"
                  url="company-types/"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="estimatedTurnover">
                <Form.Label>Estimated Turnover</Form.Label>
                <Form.Control
                  type="number"
                  name="estimatedTurnover"
                  value={companyData.estimatedTurnover}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "estimatedTurnover",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="col-12" controlId="isMacroBusiness">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Micro Business"
                  checked={companyData.isMacroBusiness}
                  onChange={(e) => {
                    dispatchInputChange({
                      type: "isMacroBusiness",
                      value: e.target.checked,
                    });
                  }}
                />
              </Form.Group>
            </Tab>
            <Tab eventKey={1} title="Company Address">
              <Form.Group
                className="mb-3 col-12"
                controlId="addressline1Company"
              >
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control
                  type="text"
                  name="addressline1Company"
                  value={companyData.addressline1Company}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "addressline1Company",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-12"
                controlId="addressline2Company"
              >
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  name="addressline2Company"
                  value={companyData.addressline2Company}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "addressline2Company",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-12"
                controlId="addressline3Company"
              >
                <Form.Label>Address Line 3</Form.Label>
                <Form.Control
                  type="text"
                  name="addressline3Company"
                  value={companyData.addressline3Company}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "addressline3Company",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="postCode">
                <Form.Label>Postcode</Form.Label>
                <Link to="/lookup" className="ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </Link>
                <Form.Control
                  type="number"
                  name="postCode"
                  value={companyData.postCode}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "postCode",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="countryOfCompany">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="countryOfCompany"
                  value={companyData.countryOfCompany}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "countryOfCompany",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Tab>
            <Tab eventKey={2} title="Bank Details">
              <Form.Group className="mb-3 col-12" controlId="accountName">
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                  type="text"
                  name="accountName"
                  value={companyData.accountName}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "accountName",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="bankName">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  type="text"
                  name="bankName"
                  value={companyData.bankName}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "bankName",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="accountNo">
                <Form.Label>Account No</Form.Label>
                <Form.Control
                  type="text"
                  name="accountNo"
                  value={companyData.accountNo}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "accountNo",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="shortCode">
                <Form.Label>Shortcode</Form.Label>
                <Form.Control
                  type="text"
                  name="shortCode"
                  value={companyData.shortCode}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "shortCode",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="sic_code">
                <Form.Label>SIC Code</Form.Label>
                <Form.Control
                  type="text"
                  name="sic_code"
                  value={companyData.sic_code}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "sic_code",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Tab>
            <Tab eventKey={3} title="Partner Details">
              <Form.Group className="mb-3 col-12" controlId="partnerName">
                <Form.Label>Partner Name</Form.Label>
                <Form.Control
                  type="text"
                  name="partnerName"
                  value={companyData.partnerName}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "partnerName",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="partnerDob">
                <Form.Label>Partner DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="partnerDob"
                  value={companyData.partnerDob}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "partnerDob",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={companyData.address}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "address",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="homePostCode">
                <Form.Label>Home Postcode</Form.Label>
                <Form.Control
                  type="text"
                  name="homePostCode"
                  value={companyData.homePostCode}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "homePostCode",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-12"
                controlId="timeAtAddressYears"
              >
                <Form.Label>Time At Address (Years)</Form.Label>
                <Form.Control
                  type="number"
                  name="timeAtAddressYears"
                  value={companyData.timeAtAddressYears}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "timeAtAddressYears",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-12"
                controlId="timeAtAddressMonths"
              >
                <Form.Label>Time At Address (Months)</Form.Label>
                <Form.Control
                  type="number"
                  name="timeAtAddressMonths"
                  value={companyData.timeAtAddressMonths}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "timeAtAddressMonths",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Tab>
            <Tab eventKey={4} title="Contacts ">
              <Form.Group className="mb-3 col-12" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={companyData.firstName}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "firstName",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={companyData.lastName}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "lastName",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="contactTitle">
                <Form.Label>Contact Title</Form.Label>
                <SelectSearch
                  options={[
                    { name: "Sir", value: "Sir" },
                    { name: "Mr", value: "Mr" },
                    { name: "Ms", value: "Ms" },
                    { name: "Mrs", value: "Mrs" },
                    { name: "Miss", value: "Miss" },
                    { name: "Dr", value: "Dr" },
                  ]}
                  placeholder="Choose from options"
                  value={companyData.contactTitle}
                  onChange={(val) => {
                    dispatchInputChange({
                      type: "contactTitle",
                      value: val,
                    });
                  }}
                  name="contactTitle"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="position">
                <Form.Label>Position </Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={companyData.position}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "position",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="telephoneNumber">
                <Form.Label>Telephone Number </Form.Label>
                <Form.Control
                  type="number"
                  name="telephoneNumber"
                  value={companyData.telephoneNumber}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "telephoneNumber",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={companyData.email}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "email",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Tab>
          </Tabs>
          <div className="col-md-12 centerBtn">
            {err?.length ? <p className="dengor">{err}</p> : ""}
            {key === 0 ? (
              ""
            ) : (
              <Button
                type="button"
                className="mx-2"
                onClick={changeTab.bind(null, false)}
              >
                Prev
              </Button>
            )}
            <Button type="submit">
              {reqCompanyStatus.isLoading ? "Submitting" : "Submit"}
            </Button>
            {key === 4 ? (
              " "
            ) : (
              <Button type="button" className="mx-2" onClick={changeTab}>
                Next
              </Button>
            )}
          </div>
        </Form>
      </NeumorphismWrapper>
    </>
  );
}

export default EditCompany;
