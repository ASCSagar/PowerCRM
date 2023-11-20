import React, { useEffect, useReducer, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SelectionBox from "../../Form/SelectionBox";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import LoadingData from "../../UI/LoadingData";
import { uiAction } from "../../../store/uiStore";

const initialCSE = {
  e_supplier: "",
  e_product: "",
  e_contract_type: "",
  e_won_date: "",
  e_contract_start_date: "",
  e_contract_end_date: "",
  e_contract_length_months: "",
  e_contract_back_date: "",
  e_supplier_reference: "",
  e_supplier_information1: "",
  e_supplier_information2: "",
  e_supplier_information3: "",
  e_agent: false,
  e_customer: false,
};

const reducerCSE = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const CurrentSupplyElectricity = () => {
  // const [open, setOpen] = useState(false);
  // const handleButtonClick = () => {
  //   setOpen(!open);
  // };
  const [CSGasData, dispatchCSElectricityData] = useReducer(reducerCSE, initialCSE);
  const dispatch = useDispatch();
  const paramsId = useParams().siteId;

  const [
    sendCurrentElectricityData,
    setCurrentElectricityReqData,
    reqStatus,
    responseCSEData,
    setCurrentElectricityResponseData,
    setStatus,
  ] = useFetch();

  const [
    currentElectricityGetData,
    setCurrentElectricityGetData,
    reqGetCurrentElectricityStatus,
    responseCurrentElectricityData,
    setCurrenElectricityGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if ((paramsId, !responseCurrentElectricityData)) {
      setCurrentElectricityGetData({
        ...currentElectricityGetData,
        url: `supply/current-supply/${paramsId}/`,
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
    if (responseCurrentElectricityData) {
      const responseData = {
        e_supplier: responseCurrentElectricityData.data.e_supplier,
        e_product: responseCurrentElectricityData.data.e_product,
        e_contract_type: responseCurrentElectricityData.data.e_contract_type,
        e_won_date: responseCurrentElectricityData.data.e_won_date,
        e_contract_start_date:
          responseCurrentElectricityData.data.e_contract_start_date,
        e_contract_end_date: responseCurrentElectricityData.data.e_contract_end_date,
        e_contract_length_months:
          responseCurrentElectricityData.data.e_contract_length_months,
        e_contract_back_date: responseCurrentElectricityData.data.e_contract_back_date,
        e_supplier_reference: responseCurrentElectricityData.data.e_supplier_reference,
        e_supplier_information1:
          responseCurrentElectricityData.data.e_supplier_information1,
        e_supplier_information2:
          responseCurrentElectricityData.data.e_supplier_information2,
        e_supplier_information3:
          responseCurrentElectricityData.data.e_supplier_information3,
        e_agent: responseCurrentElectricityData.data.e_agent,
        e_customer: responseCurrentElectricityData.data.e_customer,
      };
      dispatchCSElectricityData({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseCurrentElectricityData]);

  const CSElectricity = async function (e) {
    e.preventDefault();
    let sendData = {
      e_supplier: CSGasData.e_supplier,
      e_product: CSGasData.e_product,
      e_contract_type: CSGasData.e_contract_type,
      e_won_date: CSGasData.e_won_date,
      e_contract_start_date: CSGasData.e_contract_start_date,
      e_contract_end_date: CSGasData.e_contract_end_date,
      e_contract_length_months: CSGasData.e_contract_length_months,
      e_contract_back_date: CSGasData.e_contract_back_date,
      e_supplier_reference: CSGasData.e_supplier_reference,
      e_supplier_information1: CSGasData.e_supplier_information1,
      e_supplier_information2: CSGasData.e_supplier_information2,
      e_supplier_information3: CSGasData.e_supplier_information3,
      e_agent: CSGasData.e_agent,
      e_customer: CSGasData.e_customer,
    };
    setCurrentElectricityResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setCurrentElectricityReqData({
      ...sendCurrentElectricityData,
      url: `supply/current-supply/${paramsId}/`,
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
    if (responseCSEData) {
      dispatch(
        uiAction.setNotification({
          show: true,
          msg: `Supply Details For GAS Added Successfully`,
        })
      );
      dispatchCSElectricityData({ reset: true, value: initialCSE });
    }
  }, [responseCSEData]);

  if (reqGetCurrentElectricityStatus.isLoading) {
    return <LoadingData className="text-center" />;
  }

  return (
    <Form onSubmit={CSElectricity}>
      <div className="row">
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Supplier</Form.Label>
          <Form.Control
            type="text"
            name="Supplier"
            value={CSGasData.e_supplier}
            onChange={(e) =>
              dispatchCSElectricityData({
                type: "e_supplier",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Product</Form.Label>
          <Form.Control
            type="text"
            name="Product"
            value={CSGasData.e_product}
            onChange={(e) =>
              dispatchCSElectricityData({
                type: "e_product",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <SelectionBox
          groupClass="mb-3 col-md-3 selectbox"
          groupId="contractType"
          label="Contract Type"
          name="Contract Type"
        />
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Won Date</Form.Label>
          <Form.Control
            type="date"
            name="Won Date"
            value={CSGasData.e_won_date}
            onChange={(e) =>
              dispatchCSElectricityData({
                type: "e_won_date",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Contract Start Date</Form.Label>
          <Form.Control
            type="date"
            name="Contract Start Date"
            value={CSGasData.e_contract_start_date}
            onChange={(e) =>
              dispatchCSElectricityData({
                type: "e_contract_start_date",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Contract End Date</Form.Label>
          <Form.Control
            type="date"
            name="Contract End Date"
            value={CSGasData.e_contract_end_date}
            onChange={(e) =>
              dispatchCSElectricityData({
                type: "e_contract_end_date",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Contract Length (months)</Form.Label>
          <Form.Control
            type="number"
            name="Contract Length"
            value={CSGasData.e_contract_length_months}
            onChange={(e) =>
              dispatchCSElectricityData({
                type: "e_contract_length_months",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Contract Back Date</Form.Label>
          <Form.Control
            type="date"
            name="Contract Back Date"
            value={CSGasData.e_contract_back_date}
            onChange={(e) =>
              dispatchCSElectricityData({
                type: "e_contract_back_date",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Supplier Reference</Form.Label>
          <Form.Control
            type="text"
            name="Supplier Reference"
            value={CSGasData.e_supplier_reference}
            onChange={(e) =>
              dispatchCSElectricityData({
                type: "e_supplier_reference",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <SelectionBox
          groupClass="mb-3 col-md-3 selectbox"
          groupId="supplierinformation1"
          label="Supplier Information 1"
          name="Supplier Information 1"
        />
        <SelectionBox
          groupClass="mb-3 col-md-3 selectbox"
          groupId="supplierinformation2"
          label="Supplier Information 2"
          name="Supplier Information 2"
        />
        <SelectionBox
          groupClass="mb-3 col-md-3 selectbox"
          groupId="supplierinformation3"
          label="Supplier Information 3"
          name="Supplier Information 3"
        />
        <p>Notice of termination for this contract sent by : </p>
        <div className="d-flex justify-content-start gap-2">
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Agent"
              checked={CSGasData.e_agent}
              onChange={(e) => {
                dispatchCSElectricityData({
                  type: "e_agent",
                  value: e.target.checked,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Customer"
              checked={CSGasData.e_customer}
              onChange={(e) => {
                dispatchCSElectricityData({
                  type: "e_customer",
                  value: e.target.checked,
                });
              }}
            />
          </Form.Group>
        </div>
      </div>
      {/* <Button onClick={handleButtonClick}>Usage & Rates</Button>
      {open && (
        <div className="mt-3 row">
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Standing Charge (Pence/Day)</Form.Label>
            <Form.Control type="text" name="Standing Charge (Pence/Day)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Standing Charge Uplift (Pence/Day)</Form.Label>
            <Form.Control
              type="text"
              name="Standing Charge Uplift (Pence/Day)"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Rate (Pence/KWH)</Form.Label>
            <Form.Control type="text" name="Rate (Pence/KWH)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Unit Rate Uplift</Form.Label>
            <Form.Control type="text" name="Unit Rate Uplift" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Annual Usage (KWH)</Form.Label>
            <Form.Control type="text" name="Annual Usage (KWH)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Total Commission (£)</Form.Label>
            <Form.Control type="text" name="Supplier Reference" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Annual Commission (£)</Form.Label>
            <Form.Control type="text" name="Supplier Reference" />
          </Form.Group>
        </div>
      )} */}
      <Button variant="primary" type="submit" disabled={reqStatus.isLoading}>
        {reqStatus.isLoading ? "Submitting" : "Submit"}
      </Button>
    </Form>
  );
};

export default CurrentSupplyElectricity;
