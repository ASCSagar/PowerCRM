import React, { useEffect, useReducer, useState } from "react";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import SelectionBox from "../Form/SelectionBox";
import SelectSearch from "react-select-search";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingData from "../UI/LoadingData";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";

const initialSiteState = {
  siteName: "",
  companyName: "",
  reference: "",
  groupName: "",
  typeOfOwner: "",
  ownerName: "",
  currentSupplier: "",
  lead_source: "",
  isTenant: false,
  isVacant: false,
  isCoT: false,
  customerConsent: false,
  siteReference: "",
  supportContact: "",
  leadType: "",
  notes: "",
  billToSent: "",
  welcomeLetterSent: "",
  agentEmail: "",
  loa_header_to_use: "",
  loaTemplate: "",
  billingAddressLine1: "",
  billingAddressLine2: "",
  billingAddressLine3: "",
  billingAddressLine4: "",
  billingCountry: "",
  billingPostCode: "",
  siteAddressLine1: "",
  siteAddressLine2: "",
  siteAddressLine3: "",
  siteAddressLine4: "",
  siteCountry: "",
  sitePostCode: "",
  isBillingSiteSame: false,
  firstName: "",
  lastName: "",
  contactTitle: "",
  position: "",
  telephoneNumber: "",
  email: "",
};

const siteReducer = (state, action) => {
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

function EditSite() {
  const [siteData, dispatchInputChange] = useReducer(
    siteReducer,
    initialSiteState
  );
  const [formState, setFormState] = useState({
    error: "",
  });

  const location = useLocation();
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const paramsId = useParams().siteId;

  const [
    sendSiteData,
    setSiteReqData,
    reqSiteStatus,
    responseSiteData,
    setSiteResponseData,
    setStatus,
  ] = useFetch();

  const [
    siteGETData,
    setSiteGETData,
    reqGetSiteStatus,
    responseGetSiteData,
    setSiteGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if ((paramsId, !responseGetSiteData)) {
      setSiteGETData({
        ...siteGETData,
        url: `sites/update/site/${paramsId}/`,
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
    if (responseGetSiteData) {
      const responseData = {
        groupName: turnaryOperation(responseGetSiteData.data.group_name),
        siteName: turnaryOperation(responseGetSiteData.data.site_name),
        companyName: turnaryOperation(responseGetSiteData.data.company),
        reference: turnaryOperation(responseGetSiteData.data.reference),
        typeOfOwner: turnaryOperation(responseGetSiteData.data.type_of_owner),
        ownerName: turnaryOperation(responseGetSiteData.data.owner_name),
        currentSupplier: turnaryOperation(
          responseGetSiteData.data.current_gas_and_electricity_supplier_details
        ),
        lead_source: turnaryOperation(responseGetSiteData.data.lead_source),
        isTenant: turnaryOperation(responseGetSiteData.data.tenant),
        isVacant: turnaryOperation(responseGetSiteData.data.vacant),
        isCoT: turnaryOperation(responseGetSiteData.data.change_of_tenancy),
        customerConsent: turnaryOperation(
          responseGetSiteData.data.customer_consent
        ),
        siteReference: turnaryOperation(
          responseGetSiteData.data.site_reference
        ),
        supportContact: turnaryOperation(
          responseGetSiteData.data.support_contact
        ),
        leadType: turnaryOperation(responseGetSiteData.data.lead_type),
        notes: turnaryOperation(responseGetSiteData.data.notes),
        billToSent: turnaryOperation(responseGetSiteData.data.bill_to_sent),
        welcomeLetterSent: turnaryOperation(
          responseGetSiteData.data.welcome_letter_send
        ),
        agentEmail: turnaryOperation(responseGetSiteData.data.agent_email),
        loa_header_to_use: turnaryOperation(
          responseGetSiteData.data.loa_header_to_use
        ),
        loaTemplate: turnaryOperation(responseGetSiteData.data.loa_template),
        billingAddressLine1: turnaryOperation(
          responseGetSiteData.data.billing_address?.addressline1
        ),
        billingAddressLine2: turnaryOperation(
          responseGetSiteData.data.billing_address?.addressline2
        ),
        billingAddressLine3: turnaryOperation(
          responseGetSiteData.data.billing_address?.addressline3
        ),
        billingAddressLine4: turnaryOperation(
          responseGetSiteData.data.billing_address?.addressline4
        ),
        billingCountry: turnaryOperation(
          responseGetSiteData.data.billing_address?.country
        ),
        billingPostCode: turnaryOperation(
          responseGetSiteData.data.billing_address?.postcode
        ),
        siteAddressLine1: turnaryOperation(
          responseGetSiteData.data.site_address?.addressline1
        ),
        siteAddressLine2: turnaryOperation(
          responseGetSiteData.data.site_address?.addressline2
        ),
        siteAddressLine3: turnaryOperation(
          responseGetSiteData.data.site_address?.addressline3
        ),
        siteAddressLine4: turnaryOperation(
          responseGetSiteData.data.site_address?.addressline4
        ),
        siteCountry: turnaryOperation(
          responseGetSiteData.data.site_address?.country
        ),
        sitePostCode: turnaryOperation(
          responseGetSiteData.data.site_address?.postcode
        ),
        isBillingSiteSame: false,
        firstName: turnaryOperation(
          responseGetSiteData.data.contacts?.first_name
        ),
        lastName: turnaryOperation(
          responseGetSiteData.data.contacts?.last_name
        ),
        contactTitle: turnaryOperation(
          responseGetSiteData.data.contacts?.contact_title
        ),
        position: turnaryOperation(responseGetSiteData.data.contacts?.position),
        telephoneNumber: turnaryOperation(
          responseGetSiteData.data.contacts?.telephone_number
        ),
        email: turnaryOperation(responseGetSiteData.data.contacts?.email),
      };
      dispatchInputChange({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseGetSiteData]);

  const handleSelectionChange = (fileName, file) => {
    dispatchInputChange({ type: fileName, value: file });
  };

  const editSite = function (e) {
    e.preventDefault();
    let sendData = {
      group_name: siteData.groupName,
      site_name: siteData.siteName,
      company: siteData.companyName,
      reference: siteData.reference,
      type_of_owner: siteData.typeOfOwner,
      current_gas_and_electricity_supplier_details: siteData.currentSupplier,
      tenant: siteData.isTenant,
      vacant: siteData.isVacant,
      change_of_tenancy: siteData.isCoT,
      customer_consent: siteData.customerConsent,
      site_reference: siteData.siteReference,
      support_contact: siteData.supportContact,
      lead_type: siteData.leadType,
      notes: siteData.notes,
      bill_to_sent: siteData.billToSent,
      welcome_letter_send: siteData.welcomeLetterSent,
      agent_email: siteData.agentEmail,
      loa_header_to_use: siteData.loa_header_to_use,
      loa_template: siteData.loaTemplate,
    };
    if (siteData.ownerName) {
      sendData.owner_name = siteData.ownerName;
    }
    const billingAddress = {
      billing_address: {
        addressline1: siteData.billingAddressLine1,
        addressline2: siteData.billingAddressLine2,
        addressline3: siteData.billingAddressLine3,
        addressline4: siteData.billingAddressLine4,
        country: siteData.billingCountry,
        postcode: siteData.billingPostCode,
      },
    };
    if (
      billingAddress.billing_address.addressline1 ||
      billingAddress.billing_address.addressline2 ||
      billingAddress.billing_address.addressline3 ||
      billingAddress.billing_address.addressline4 ||
      billingAddress.billing_address.country ||
      billingAddress.billing_address.postcode
    ) {
      sendData = { ...sendData, ...billingAddress };
    }

    const siteAaddress = {
      site_address: {
        addressline1: siteData.siteAddressLine1,
        addressline2: siteData.siteAddressLine2,
        addressline3: siteData.siteAddressLine3,
        addressline4: siteData.siteAddressLine4,
        country: siteData.siteCountry,
        postcode: siteData.sitePostCode,
      },
    };
    if (
      siteAaddress.site_address.addressline1 ||
      siteAaddress.site_address.addressline2 ||
      siteAaddress.site_address.addressline3 ||
      siteAaddress.site_address.addressline4 ||
      siteAaddress.site_address.country ||
      siteAaddress.site_address.postcode
    ) {
      sendData = { ...sendData, ...siteAaddress };
    }
    const contactsInfo = {
      contacts: {
        first_name: siteData.firstName,
        last_name: siteData.lastName,
        contact_title: siteData.contactTitle,
        position: siteData.position,
        telephone_number: siteData.telephoneNumber,
        email: siteData.email,
      },
    };
    if (
      contactsInfo.contacts.first_name ||
      contactsInfo.contacts.last_name ||
      contactsInfo.contacts.contact_title ||
      contactsInfo.contacts.position ||
      contactsInfo.contacts.telephone_number ||
      contactsInfo.contacts.email
    ) {
      sendData = { ...sendData, ...contactsInfo };
    }
    setSiteResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setSiteReqData({
      ...sendSiteData,
      url: `sites/update/site/${paramsId}/`,
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
    if (responseSiteData) {
      if (responseSiteData.status === 200 || responseSiteData.status === 201) {
        setFormState({ error: "" });
        if (location?.state?.groupId) {
          navigate(-1, {
            state: {
              groupId: location.state.groupId,
            },
          });
        }
        navigate("/sites");
      }
    }
  }, [responseSiteData]);

  if (reqGetSiteStatus.isLoading) {
    return <LoadingData className="text-center" />;
  }

  const changeTab = function (isNext = true) {
    setKey((oldKey) => {
      return isNext ? oldKey + 1 : oldKey - 1;
    });
  };

  return (
    <NeumorphismWrapper>
      <div className="col-md-12 col-xl-12 col-12">
        <div className="widget-header">
          <h4>Site Details</h4>
        </div>
        <div id="tabsSimple" className=" layout-spacing"></div>
        <div className="">
          <Form onSubmit={editSite}>
            <Tabs
              activeKey={key}
              onSelect={(k) => setKey(+k)}
              id="controlled-tab-example"
              className="mb-3"
            >
              <Tab eventKey={0} title="Site Info">
                <Form.Group className="mb-3 col-12" controlId="siteName">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteName"
                    value={siteData.siteName}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "siteName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <SelectionBox
                  groupClass="mb-3 col-md-6 selectbox"
                  groupId="companyName"
                  label="Company Name"
                  value={siteData.companyName}
                  onChange={handleSelectionChange.bind(null, "companyName")}
                  name="companyName"
                  isSearch={true}
                  objKey="name"
                  url="sites/get/company_name/"
                />
                <Form.Group className="mb-3 col-12" controlId="reference">
                  <Form.Label>Reference</Form.Label>
                  <Form.Control
                    type="text"
                    name="reference"
                    value={siteData.reference}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "reference",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <SelectionBox
                  groupClass="mb-3 col-md-6 selectbox"
                  groupId="groupName"
                  label="Group Name"
                  value={siteData.groupName}
                  onChange={handleSelectionChange.bind(null, "groupName")}
                  name="groupName"
                  isSearch={true}
                  objKey="group_name"
                  url="sites/groups/"
                />
                <Form.Group className="mb-3 col-12" controlId="typeOfOwner">
                  <Form.Label>Type Of Owner</Form.Label>
                  <Form.Control
                    type="text"
                    name="typeOfOwner"
                    value={siteData.typeOfOwner}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "typeOfOwner",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="ownerName">
                  <Form.Label>Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    value={siteData.ownerName}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "ownerName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="currentSupplier">
                  <Form.Label>
                    Current Gas And Electricity Supplier Details
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="currentSupplier"
                    value={siteData.currentSupplier}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "currentSupplier",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="isTenant">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Tenant"
                    checked={siteData.isTenant}
                    onChange={(e) => {
                      dispatchInputChange({
                        type: "isTenant",
                        value: e.target.checked,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="isVacant">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Vacant"
                    checked={siteData.isVacant}
                    onChange={(e) => {
                      dispatchInputChange({
                        type: "isVacant",
                        value: e.target.checked,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="isCoT">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="COT"
                    checked={siteData.isCoT}
                    onChange={(e) => {
                      dispatchInputChange({
                        type: "isCoT",
                        value: e.target.checked,
                      });
                    }}
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey={1} title="Our Details">
                <Form.Group className="mb-3 col-12" controlId="siteReference">
                  <Form.Label>Site Reference</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteReference"
                    value={siteData.siteReference}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "siteReference",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <SelectionBox
                  groupClass="mb-3 col-md-6 selectbox"
                  groupId="supportContact"
                  label="Support Contact"
                  value={siteData.supportContact}
                  onChange={handleSelectionChange.bind(null, "supportContact")}
                  name="supportContact"
                  isSearch={true}
                  objKey="username"
                  url="sites/get/support_contact/"
                />
                <Form.Group className="mb-3 col-12" controlId="lead_source">
                  <Form.Label>Lead Source</Form.Label>
                  <Form.Control
                    type="text"
                    name="lead_source"
                    value={siteData.lead_source}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "lead_source",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    type="textarea"
                    name="notes"
                    value={siteData.notes}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "notes",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="leadType">
                  <Form.Label>Lead Type</Form.Label>
                  <SelectSearch
                    options={[
                      { name: "GAS", value: "GAS" },
                      { name: "ELECTRICITY", value: "ELECTRICITY" },
                    ]}
                    placeholder="Choose from options"
                    value={siteData.leadType}
                    onChange={(val) => {
                      dispatchInputChange({
                        type: "leadType",
                        value: val,
                      });
                    }}
                    name="leadType"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="billToSent">
                  <Form.Check 
                    type="switch"
                    id="custom-switch"
                    checked={siteData.billToSent}
                    label="Bill to Sent"
                    onChange={(e) => {
                      dispatchInputChange({
                        type: "billToSent",
                        value: e.target.checked,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="welcomeLetterSent"
                >
                  <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Welcome Letter Sent"
                    checked={siteData.welcomeLetterSent}
                    onChange={(e) => {
                      dispatchInputChange({
                        type: "welcomeLetterSent",
                        value: e.target.checked,
                      });
                    }}
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey={2} title="Letter Of Authority">
                <Form.Group className="mb-3 col-12" controlId="agentEmail">
                  <Form.Label>Agent Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="agentEmail"
                    value={siteData.agentEmail}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "agentEmail",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="loa_header_to_use">
                  <Form.Label>LOA Header To Use</Form.Label>
                  <SelectSearch
                    options={[
                      { name: "Site Name", value: 1 },
                      { name: "Company Name", value: 2 },
                    ]}
                    placeholder="Choose from options"
                    value={siteData.loa_header_to_use}
                    onChange={(val) => {
                      dispatchInputChange({
                        type: "loa_header_to_use",
                        value: val,
                      });
                    }}
                    name="loa_header_to_use"
                  />
                </Form.Group>
                <SelectionBox
                  groupClass="mb-3 col-md-6 selectbox"
                  groupId="loaTemplate"
                  label="LOA Template"
                  value={siteData.loaTemplate}
                  onChange={handleSelectionChange.bind(null, "loaTemplate")}
                  name="loaTemplate"
                  isSearch={true}
                  objKey="name"
                  url="sites/get/loa_template/"
                />
              </Tab>
              <Tab eventKey={3} title="Site Address">
                <Form.Group className="mb-3 col-12" controlId="sitePostCode">
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="sitePostCode"
                    value={siteData.sitePostCode}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "sitePostCode",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="siteAddressLine1"
                >
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteAddressLine1"
                    value={siteData.siteAddressLine1}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "siteAddressLine1",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="siteAddressLine2"
                >
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteAddressLine2"
                    value={siteData.siteAddressLine2}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "siteAddressLine2",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="siteAddressLine3"
                >
                  <Form.Label>Address Line 3</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteAddressLine3"
                    value={siteData.siteAddressLine3}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "siteAddressLine3",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="siteAddressLine4"
                >
                  <Form.Label>Address Line 4</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteAddressLine4"
                    value={siteData.siteAddressLine4}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "siteAddressLine4",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="siteCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteCountry"
                    value={siteData.siteCountry}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "siteCountry",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey={4} title="Billing Address">
                <Form.Group
                  className="mb-3 col-12"
                  controlId="isBillingSiteSame"
                >
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    checked={siteData.isBillingSiteSame}
                    label="Is Billing Address Same As Site Address?"
                    onChange={(e) => {
                      dispatchInputChange({
                        type: "isBillingSiteSame",
                        value: e.target.checked,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="billingPostCode">
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="billingPostCode"
                    value={siteData.billingPostCode}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "billingPostCode",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="billingAddressLine1"
                >
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="billingAddressLine1"
                    value={siteData.billingAddressLine1}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "billingAddressLine1",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="billingAddressLine2"
                >
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="billingAddressLine2"
                    value={siteData.billingAddressLine2}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "billingAddressLine2",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="billingAddressLine3"
                >
                  <Form.Label>Address Line 3</Form.Label>
                  <Form.Control
                    type="text"
                    name="billingAddressLine3"
                    value={siteData.billingAddressLine3}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "billingAddressLine3",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="billingAddressLine4"
                >
                  <Form.Label>Address Line 4</Form.Label>
                  <Form.Control
                    type="text"
                    name="billingAddressLine4"
                    value={siteData.billingAddressLine4}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "billingAddressLine4",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="billingCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="billingCountry"
                    value={siteData.billingCountry}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "billingCountry",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey={5} title="Contact">
                <Form.Group className="mb-3 col-12" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={siteData.firstName}
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
                    value={siteData.lastName}
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
                    value={siteData.contactTitle}
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
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={siteData.position}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "position",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="telephoneNumber">
                  <Form.Label>Telephone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="telephoneNumber"
                    value={siteData.telephoneNumber}
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
                    value={siteData.email}
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
              {key === 0 ? (
                " "
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
                {reqSiteStatus.isLoading ? "Submitting" : "Submit"}
              </Button>
              {key === 5 ? (
                " "
              ) : (
                <Button type="button" className="mx-2" onClick={changeTab}>
                  Next
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </NeumorphismWrapper>
  );
}

export default EditSite;
