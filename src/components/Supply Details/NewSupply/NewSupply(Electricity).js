import React, { useEffect, useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import SelectionBox from "../../Form/SelectionBox";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { uiAction } from "../../../store/uiStore";
import LoadingData from "../../UI/LoadingData";

const initialNSE = {
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
  e_notes: "",
  e_agent: false,
  e_customer: false,
};

const reducerNSE = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const NewSupplyElectricity = () => {
  const [open, setOpen] = useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  };
  const [NSElectricityData, dispatchNSElectricityData] = useReducer(
    reducerNSE,
    initialNSE
  );
  const dispatch = useDispatch();
  const paramsId = useParams().siteId;
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const [
    sendNewElectricityData,
    setNewElectricityReqData,
    reqStatus,
    responseNSEData,
    setNewElectricityResponseData,
    setStatus,
  ] = useFetch();

  const [
    newElectricityGetData,
    setNewElectricityGetData,
    reqGetNewElectricityStatus,
    responseNewElectricityData,
    setNewElectricityGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if ((paramsId, !responseNewElectricityData)) {
      setNewElectricityGetData({
        ...newElectricityGetData,
        url: `supply/new-supply/${paramsId}/`,
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
    if (responseNewElectricityData) {
      const responseData = {
        e_supplier: responseNewElectricityData.data.e_supplier,
        e_product: responseNewElectricityData.data.e_product,
        e_contract_type: responseNewElectricityData.data.e_contract_type,
        e_won_date: responseNewElectricityData.data.e_won_date,
        e_contract_start_date:
          responseNewElectricityData.data.e_contract_start_date,
        e_contract_end_date:
          responseNewElectricityData.data.e_contract_end_date,
        e_contract_length_months:
          responseNewElectricityData.data.e_contract_length_months,
        e_contract_back_date:
          responseNewElectricityData.data.e_contract_back_date,
        e_supplier_reference:
          responseNewElectricityData.data.e_supplier_reference,
        e_supplier_information1:
          responseNewElectricityData.data.e_supplier_information1,
        e_supplier_information2:
          responseNewElectricityData.data.e_supplier_information2,
        e_supplier_information3:
          responseNewElectricityData.data.e_supplier_information3,
        e_notes: responseNewElectricityData.data.e_notes,
        e_agent: responseNewElectricityData.data.e_agent,
        e_customer: responseNewElectricityData.data.e_customer,
      };
      dispatchNSElectricityData({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseNewElectricityData]);

  const CSGas = async function (e) {
    e.preventDefault();
    let sendData = {
      e_supplier: NSElectricityData.e_supplier,
      e_product: NSElectricityData.e_product,
      e_contract_type: NSElectricityData.e_contract_type,
      e_won_date: NSElectricityData.e_won_date,
      e_contract_start_date: NSElectricityData.e_contract_start_date,
      e_contract_end_date: NSElectricityData.e_contract_end_date,
      e_contract_length_months: NSElectricityData.e_contract_length_months,
      e_contract_back_date: NSElectricityData.e_contract_back_date,
      e_supplier_reference: NSElectricityData.e_supplier_reference,
      e_supplier_information1: NSElectricityData.e_supplier_information1,
      e_supplier_information2: NSElectricityData.e_supplier_information2,
      e_supplier_information3: NSElectricityData.e_supplier_information3,
      e_notes: NSElectricityData.e_notes,
      e_agent: NSElectricityData.e_agent,
      e_customer: NSElectricityData.e_customer,
    };
    setNewElectricityResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setNewElectricityReqData({
      ...sendNewElectricityData,
      url: `supply/new-supply/${paramsId}/`,
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
    if (responseNSEData) {
      if (responseNSEData.status === 200 || responseNSEData.status === 201) {
        navigate("/sites");
        dispatch(
          uiAction.setNotification({
            show: true,
            msg: `Supply Details For GAS Edited Successfully`,
          })
        );
        dispatchNSElectricityData({ reset: true, value: initialNSE });
      } else {
        setErr("Some Proble Occured, Please try again");
      }
    }
  }, [responseNSEData]);

  if (reqGetNewElectricityStatus.isLoading) {
    return <LoadingData className="text-center" />;
  }

  return (
    <Form onSubmit={CSGas}>
      <div className="row">
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Supplier</Form.Label>
          <Form.Control
            type="text"
            name="Supplier"
            value={NSElectricityData.e_supplier}
            onChange={(e) =>
              dispatchNSElectricityData({
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
            value={NSElectricityData.e_product}
            onChange={(e) =>
              dispatchNSElectricityData({
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
            value={NSElectricityData.e_won_date}
            onChange={(e) =>
              dispatchNSElectricityData({
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
            value={NSElectricityData.e_contract_start_date}
            onChange={(e) =>
              dispatchNSElectricityData({
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
            value={NSElectricityData.e_contract_end_date}
            onChange={(e) =>
              dispatchNSElectricityData({
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
            value={NSElectricityData.e_contract_length_months}
            onChange={(e) =>
              dispatchNSElectricityData({
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
            value={NSElectricityData.e_contract_back_date}
            onChange={(e) =>
              dispatchNSElectricityData({
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
            value={NSElectricityData.e_supplier_reference}
            onChange={(e) =>
              dispatchNSElectricityData({
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
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="text"
            name="Notes"
            value={NSElectricityData.e_notes}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_notes",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <p>Notice of termination for this contract sent by : </p>
        <div className="d-flex justify-content-start gap-2">
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Agent"
              checked={NSElectricityData.e_agent}
              onChange={(e) => {
                dispatchNSElectricityData({
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
              checked={NSElectricityData.e_customer}
              onChange={(e) => {
                dispatchNSElectricityData({
                  type: "e_customer",
                  value: e.target.checked,
                });
              }}
            />
          </Form.Group>
        </div>
      </div>
      <Button onClick={handleButtonClick}>Usage & Rates</Button>
      {open && (
        <div className="mt-3 row">
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Standing Charge (pence/day)</Form.Label>
            <Form.Control type="text" name="Standing Charge (pence/day)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Standing Charge Uplift (pence/day)</Form.Label>
            <Form.Control
              type="text"
              name="Standing Charge Uplift (pence/day)"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Rate (pence/kWh)</Form.Label>
            <Form.Control type="text" name="Rate (pence/kWh)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Unit Rate Uplift</Form.Label>
            <Form.Control type="text" name="Unit Rate Uplift" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Feed-in Tariff (FiT)</Form.Label>
            <Form.Control type="text" name="Feed-in Tariff (FiT)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Annual Day Usage (kWh)</Form.Label>
            <Form.Control type="text" name="Annual Day Usage (kWh)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Day Rate (pence/kWh)</Form.Label>
            <Form.Control type="text" name="Day Rate (pence/kWh)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Annual Night Usage (kWh)</Form.Label>
            <Form.Control type="text" name="Annual Night Usage (kWh)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Night Rate (pence/kWh)</Form.Label>
            <Form.Control type="text" name="Night Rate (pence/kWh)" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Annual Evening/Weekend Usage</Form.Label>
            <Form.Control type="text" name="Annual Evening/Weekend Usage" />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Evening/Weekend Rate (pence/kWh)</Form.Label>
            <Form.Control type="text" name="Evening/Weekend Rate (pence/kWh)" />
          </Form.Group>
          <div className="d-flex gap-4 mb-2">
            <div>Total Annual Usage (kWh) : 0.00</div>
            <div>Total Commission (£) : 0.00</div>
            <div>Annual Commission (£) : 0.00</div>
          </div>
        </div>
      )}
      {err ? <p className="red">{err}</p> : ""}
      <Button variant="primary" type="submit" disabled={reqStatus.isLoading}>
        {reqStatus.isLoading ? "Submitting" : "Submit"}
      </Button>
    </Form>
  );
};

export default NewSupplyElectricity;
