import React, { useEffect, useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import SelectionBox from "../../Form/SelectionBox";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { uiAction } from "../../../store/uiStore";
import LoadingData from "../../UI/LoadingData";

const initialNSG = {
  g_supplier: "",
  g_product: "",
  g_contract_type: "",
  g_won_date: "",
  g_contract_start_date: "",
  g_contract_end_date: "",
  g_contract_length_months: "",
  g_contract_back_date: "",
  g_supplier_reference: "",
  g_supplier_information1: "",
  g_supplier_information2: "",
  g_supplier_information3: "",
  g_notes: "",
  g_agent: false,
  g_customer: false,
};

const reducerNSG = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const NewSupplyGas = () => {
  // const [open, setOpen] = useState(false);
  // const handleButtonClick = () => {
  //   setOpen(!open);
  // };
  const [NSGasData, dispatchNSGasData] = useReducer(reducerNSG, initialNSG);
  const dispatch = useDispatch();
  const paramsId = useParams().siteId;
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const [
    sendNewGasData,
    setNewGasReqData,
    reqStatus,
    responseNSGData,
    setNewGasResponseData,
    setStatus,
  ] = useFetch();

  const [
    newGasGetData,
    setNewGasGetData,
    reqGetNewGasStatus,
    responseNewGasData,
    setNewGasGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if ((paramsId, !responseNewGasData)) {
      setNewGasGetData({
        ...newGasGetData,
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
    if (responseNewGasData) {
      const responseData = {
        g_supplier: responseNewGasData.data.g_supplier,
        g_product: responseNewGasData.data.g_product,
        g_contract_type: responseNewGasData.data.g_contract_type,
        g_won_date: responseNewGasData.data.g_won_date,
        g_contract_start_date: responseNewGasData.data.g_contract_start_date,
        g_contract_end_date: responseNewGasData.data.g_contract_end_date,
        g_contract_length_months:
          responseNewGasData.data.g_contract_length_months,
        g_contract_back_date: responseNewGasData.data.g_contract_back_date,
        g_supplier_reference: responseNewGasData.data.g_supplier_reference,
        g_supplier_information1:
          responseNewGasData.data.g_supplier_information1,
        g_supplier_information2:
          responseNewGasData.data.g_supplier_information2,
        g_supplier_information3:
          responseNewGasData.data.g_supplier_information3,
        g_notes: responseNewGasData.data.g_notes,
        g_agent: responseNewGasData.data.g_agent,
        g_customer: responseNewGasData.data.g_customer,
      };
      dispatchNSGasData({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseNewGasData]);

  const CSGas = async function (e) {
    e.preventDefault();
    let sendData = {
      g_supplier: NSGasData.g_supplier,
      g_product: NSGasData.g_product,
      g_contract_type: NSGasData.g_contract_type,
      g_won_date: NSGasData.g_won_date,
      g_contract_start_date: NSGasData.g_contract_start_date,
      g_contract_end_date: NSGasData.g_contract_end_date,
      g_contract_length_months: NSGasData.g_contract_length_months,
      g_contract_back_date: NSGasData.g_contract_back_date,
      g_supplier_reference: NSGasData.g_supplier_reference,
      g_supplier_information1: NSGasData.g_supplier_information1,
      g_supplier_information2: NSGasData.g_supplier_information2,
      g_supplier_information3: NSGasData.g_supplier_information3,
      g_notes: NSGasData.g_notes,
      g_agent: NSGasData.g_agent,
      g_customer: NSGasData.g_customer,
    };
    setNewGasResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setNewGasReqData({
      ...sendNewGasData,
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
    if (responseNSGData) {
      if (responseNSGData.status === 200 || responseNSGData.status === 201) {
        navigate("/sites");
        dispatch(
          uiAction.setNotification({
            show: true,
            msg: `Supply Details For GAS Edited Successfully`,
          })
        );
        dispatchNSGasData({ reset: true, value: initialNSG });
      } else {
        setErr("Some Proble Occured, Please try again");
      }
    }
  }, [responseNSGData]);

  if (reqGetNewGasStatus.isLoading) {
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
            value={NSGasData.g_supplier}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_supplier",
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
            value={NSGasData.g_product}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_product",
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
            value={NSGasData.g_won_date}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_won_date",
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
            value={NSGasData.g_contract_start_date}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_contract_start_date",
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
            value={NSGasData.g_contract_end_date}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_contract_end_date",
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
            value={NSGasData.g_contract_length_months}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_contract_length_months",
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
            value={NSGasData.g_contract_back_date}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_contract_back_date",
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
            value={NSGasData.g_supplier_reference}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_supplier_reference",
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
            value={NSGasData.g_notes}
            onChange={(e) =>
              dispatchNSGasData({
                type: "g_notes",
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
              checked={NSGasData.g_agent}
              onChange={(e) => {
                dispatchNSGasData({
                  type: "g_agent",
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
              checked={NSGasData.g_customer}
              onChange={(e) => {
                dispatchNSGasData({
                  type: "g_customer",
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
      {err ? <p className="red">{err}</p> : ""}
      <Button variant="primary" type="submit" disabled={reqStatus.isLoading}>
        {reqStatus.isLoading ? "Submitting" : "Submit"}
      </Button>
    </Form>
  );
};

export default NewSupplyGas;
