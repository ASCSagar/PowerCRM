import React, { useEffect, useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import SelectionBox from "../../Form/SelectionBox";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { uiAction } from "../../../store/uiStore";
import LoadingData from "../../UI/LoadingData";

const initialCSG = {
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
  g_agent: false,
  g_customer: false,
  stading_charge: "",
  standing_charge_uplift: "",
  unit_rate_uplift: "",
  rate: "",
  annual_usage: "",
};

const reducerCSG = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const CurrentSupplyGas = () => {
  const [open, setOpen] = useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  };
  const [CSGasData, dispatchCSGasData] = useReducer(reducerCSG, initialCSG);
  const dispatch = useDispatch();
  const paramsId = useParams().siteId;
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const [
    sendCurrentGasData,
    setCurrentGasReqData,
    reqStatus,
    responseCSGData,
    setCurrentGasResponseData,
    setStatus,
  ] = useFetch();

  const [
    currentGasGetData,
    setCurrentGasGetData,
    reqGetCurrentGasStatus,
    responseCurrentGasData,
    setCurrentGasGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if ((paramsId, !responseCurrentGasData)) {
      setCurrentGasGetData({
        ...currentGasGetData,
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
    if (responseCurrentGasData) {
      const responseData = {
        g_supplier: responseCurrentGasData.data.g_supplier,
        g_product: responseCurrentGasData.data.g_product,
        g_contract_type: responseCurrentGasData.data.g_contract_type,
        g_won_date: responseCurrentGasData.data.g_won_date,
        g_contract_start_date:
          responseCurrentGasData.data.g_contract_start_date,
        g_contract_end_date: responseCurrentGasData.data.g_contract_end_date,
        g_contract_length_months:
          responseCurrentGasData.data.g_contract_length_months,
        g_contract_back_date: responseCurrentGasData.data.g_contract_back_date,
        g_supplier_reference: responseCurrentGasData.data.g_supplier_reference,
        g_supplier_information1:
          responseCurrentGasData.data.g_supplier_information1,
        g_supplier_information2:
          responseCurrentGasData.data.g_supplier_information2,
        g_supplier_information3:
          responseCurrentGasData.data.g_supplier_information3,
        g_agent: responseCurrentGasData.data.g_agent,
        g_customer: responseCurrentGasData.data.g_customer,
        stading_charge:
          responseCurrentGasData.data.gas_usage_rate.stading_charge,
        standing_charge_uplift:
          responseCurrentGasData.data.gas_usage_rate.standing_charge_uplift,
        unit_rate_uplift:
          responseCurrentGasData.data.gas_usage_rate.unit_rate_uplift,
        rate: responseCurrentGasData.data.gas_usage_rate.rate,
        annual_usage: responseCurrentGasData.data.gas_usage_rate.annual_usage,
      };
      dispatchCSGasData({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseCurrentGasData]);

  const CSGas = async function (e) {
    e.preventDefault();
    let sendData = {
      g_supplier: CSGasData.g_supplier,
      g_product: CSGasData.g_product,
      g_contract_type: CSGasData.g_contract_type,
      g_won_date: CSGasData.g_won_date,
      g_contract_start_date: CSGasData.g_contract_start_date,
      g_contract_end_date: CSGasData.g_contract_end_date,
      g_contract_length_months: CSGasData.g_contract_length_months,
      g_contract_back_date: CSGasData.g_contract_back_date,
      g_supplier_reference: CSGasData.g_supplier_reference,
      g_supplier_information1: CSGasData.g_supplier_information1,
      g_supplier_information2: CSGasData.g_supplier_information2,
      g_supplier_information3: CSGasData.g_supplier_information3,
      g_agent: CSGasData.g_agent,
      g_customer: CSGasData.g_customer,
    };
    const gasUsageRate = {
      gas_usage_rate: {
        stading_charge: CSGasData.stading_charge,
        standing_charge_uplift: CSGasData.standing_charge_uplift,
        unit_rate_uplift: CSGasData.unit_rate_uplift,
        rate: CSGasData.rate,
        annual_usage: CSGasData.annual_usage,
      },
    };
    if (
      gasUsageRate.gas_usage_rate.stading_charge ||
      gasUsageRate.gas_usage_rate.standing_charge_uplift ||
      gasUsageRate.gas_usage_rate.rate ||
      gasUsageRate.gas_usage_rate.unit_rate_uplift ||
      gasUsageRate.gas_usage_rate.annual_usage
    ) {
      sendData = { ...sendData, ...gasUsageRate };
    }
    setCurrentGasResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setCurrentGasReqData({
      ...sendCurrentGasData,
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
    if (responseCSGData) {
      if (responseCSGData.status === 200 || responseCSGData.status === 201) {
        navigate("/sites");
        dispatch(
          uiAction.setNotification({
            show: true,
            msg: `Current Supply For GAS Edited Successfully`,
          })
        );
        dispatchCSGasData({ reset: true, value: initialCSG });
      } else {
        setErr("Some Proble Occured, Please try again");
      }
    }
  }, [responseCSGData]);

  if (reqGetCurrentGasStatus.isLoading) {
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
            value={CSGasData.g_supplier}
            onChange={(e) =>
              dispatchCSGasData({
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
            value={CSGasData.g_product}
            onChange={(e) =>
              dispatchCSGasData({
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
            value={CSGasData.g_won_date}
            onChange={(e) =>
              dispatchCSGasData({
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
            value={CSGasData.g_contract_start_date}
            onChange={(e) =>
              dispatchCSGasData({
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
            value={CSGasData.g_contract_end_date}
            onChange={(e) =>
              dispatchCSGasData({
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
            value={CSGasData.g_contract_length_months}
            onChange={(e) =>
              dispatchCSGasData({
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
            value={CSGasData.g_contract_back_date}
            onChange={(e) =>
              dispatchCSGasData({
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
            value={CSGasData.g_supplier_reference}
            onChange={(e) =>
              dispatchCSGasData({
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
        <p>Notice of termination for this contract sent by : </p>
        <div className="d-flex justify-content-start gap-2">
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Agent"
              checked={CSGasData.g_agent}
              onChange={(e) => {
                dispatchCSGasData({
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
              checked={CSGasData.g_customer}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "g_customer",
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
            <Form.Control
              type="number"
              name="Standing Charge (pence/day)"
              value={CSGasData.stading_charge}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "stading_charge",
                  value: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Standing Charge Uplift (pence/day)</Form.Label>
            <Form.Control
              type="number"
              name="Standing Charge Uplift (pence/day)"
              value={CSGasData.standing_charge_uplift}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "standing_charge_uplift",
                  value: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Rate (pence/kWh)</Form.Label>
            <Form.Control
              type="number"
              name="Rate (pence/kWh)"
              value={CSGasData.rate}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "rate",
                  value: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Unit Rate Uplift</Form.Label>
            <Form.Control
              type="number"
              name="Unit Rate Uplift"
              value={CSGasData.unit_rate_uplift}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "unit_rate_uplift",
                  value: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Annual Usage (KWH)</Form.Label>
            <Form.Control
              type="number"
              name="Annual Usage (KWH)"
              value={CSGasData.annual_usage}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "annual_usage",
                  value: e.target.value,
                });
              }}
            />
          </Form.Group>
          <div className="d-flex gap-4 mb-2">
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

export default CurrentSupplyGas;
