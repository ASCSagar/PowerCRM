import React, { useEffect, useReducer, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SelectionBox from "../../Form/SelectionBox";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
  stading_charge: "",
  standing_charge_uplift: "",
  kva_rate: "",
  unit_rate_uplift: "",
  feed_in_tariff: "",
  annual_day_usage: "",
  day_rate: "",
  annual_night_usage: "",
  night_rate: "",
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
  const [open, setOpen] = useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  };
  const [CSElectricData, dispatchCSElectricityData] = useReducer(
    reducerCSE,
    initialCSE
  );
  const dispatch = useDispatch();
  const paramsId = useParams().siteId;
  const navigate = useNavigate();
  const [err, setErr] = useState("");

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
        e_contract_end_date:
          responseCurrentElectricityData.data.e_contract_end_date,
        e_contract_length_months:
          responseCurrentElectricityData.data.e_contract_length_months,
        e_contract_back_date:
          responseCurrentElectricityData.data.e_contract_back_date,
        e_supplier_reference:
          responseCurrentElectricityData.data.e_supplier_reference,
        e_supplier_information1:
          responseCurrentElectricityData.data.e_supplier_information1,
        e_supplier_information2:
          responseCurrentElectricityData.data.e_supplier_information2,
        e_supplier_information3:
          responseCurrentElectricityData.data.e_supplier_information3,
        e_agent: responseCurrentElectricityData.data.e_agent,
        e_customer: responseCurrentElectricityData.data.e_customer,
        stading_charge:
          responseCurrentElectricityData.data.electric_usage_rate
            .stading_charge,
        standing_charge_uplift:
          responseCurrentElectricityData.data.electric_usage_rate
            .standing_charge_uplift,
        kva_rate:
          responseCurrentElectricityData.data.electric_usage_rate.kva_rate,
        unit_rate_uplift:
          responseCurrentElectricityData.data.electric_usage_rate
            .unit_rate_uplift,
        feed_in_tariff:
          responseCurrentElectricityData.data.electric_usage_rate
            .feed_in_tariff,
        annual_day_usage:
          responseCurrentElectricityData.data.electric_usage_rate
            .annual_day_usage,
        day_rate:
          responseCurrentElectricityData.data.electric_usage_rate.day_rate,
        annual_night_usage:
          responseCurrentElectricityData.data.electric_usage_rate
            .annual_night_usage,
        night_rate:
          responseCurrentElectricityData.data.electric_usage_rate.night_rate,
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
      e_supplier: CSElectricData.e_supplier,
      e_product: CSElectricData.e_product,
      e_contract_type: CSElectricData.e_contract_type,
      e_won_date: CSElectricData.e_won_date,
      e_contract_start_date: CSElectricData.e_contract_start_date,
      e_contract_end_date: CSElectricData.e_contract_end_date,
      e_contract_length_months: CSElectricData.e_contract_length_months,
      e_contract_back_date: CSElectricData.e_contract_back_date,
      e_supplier_reference: CSElectricData.e_supplier_reference,
      e_supplier_information1: CSElectricData.e_supplier_information1,
      e_supplier_information2: CSElectricData.e_supplier_information2,
      e_supplier_information3: CSElectricData.e_supplier_information3,
      e_agent: CSElectricData.e_agent,
      e_customer: CSElectricData.e_customer,
    };
    const electricUsageRate = {
      electric_usage_rate: {
        stading_charge: CSElectricData.stading_charge,
        standing_charge_uplift: CSElectricData.standing_charge_uplift,
        kva_rate: CSElectricData.kva_rate,
        unit_rate_uplift: CSElectricData.unit_rate_uplift,
        feed_in_tariff: CSElectricData.feed_in_tariff,
        annual_day_usage: CSElectricData.annual_day_usage,
        day_rate: CSElectricData.day_rate,
        annual_night_usage: CSElectricData.annual_night_usage,
        night_rate: CSElectricData.night_rate,
      },
    };
    if (
      electricUsageRate.electric_usage_rate.stading_charge ||
      electricUsageRate.electric_usage_rate.standing_charge_uplift ||
      electricUsageRate.electric_usage_rate.kva_rate ||
      electricUsageRate.electric_usage_rate.unit_rate_uplift ||
      electricUsageRate.electric_usage_rate.feed_in_tariff ||
      electricUsageRate.electric_usage_rate.annual_day_usage ||
      electricUsageRate.electric_usage_rate.day_rate ||
      electricUsageRate.electric_usage_rate.annual_night_usage ||
      electricUsageRate.electric_usage_rate.night_rate
    ) {
      sendData = { ...sendData, ...electricUsageRate };
    }
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
      if (responseCSEData.status === 200 || responseCSEData.status === 201) {
        navigate("/sites");
        dispatch(
          uiAction.setNotification({
            show: true,
            msg: `Current Supply For Electricity Edited Successfully`,
          })
        );
        dispatchCSElectricityData({ reset: true, value: initialCSE });
      } else {
        setErr("Some Proble Occured, Please try again");
      }
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
            value={CSElectricData.e_supplier}
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
            value={CSElectricData.e_product}
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
            value={CSElectricData.e_won_date}
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
            value={CSElectricData.e_contract_start_date}
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
            value={CSElectricData.e_contract_end_date}
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
            value={CSElectricData.e_contract_length_months}
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
            value={CSElectricData.e_contract_back_date}
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
            value={CSElectricData.e_supplier_reference}
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
              checked={CSElectricData.e_agent}
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
              checked={CSElectricData.e_customer}
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
      <Button onClick={handleButtonClick}>Usage & Rates</Button>
      {open && (
        <div className="mt-3 row">
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Standing Charge (pence/day)</Form.Label>
            <Form.Control
              type="number"
              name="Stading Charge (pence/day)"
              value={CSElectricData.stading_charge}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "stading_charge",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Standing Charge Uplift (pence/day)</Form.Label>
            <Form.Control
              type="number"
              name="Standing Charge Uplift (pence/day)"
              value={CSElectricData.standing_charge_uplift}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "standing_charge_uplift",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>kVA Rate (pence/kWh)</Form.Label>
            <Form.Control
              type="number"
              name="kVA Rate (pence/kWh)"
              value={CSElectricData.kva_rate}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "kva_rate",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Unit Rate Uplift</Form.Label>
            <Form.Control
              type="number"
              name="Unit Rate Uplift"
              value={CSElectricData.unit_rate_uplift}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "unit_rate_uplift",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Feed-in Tariff (FiT)</Form.Label>
            <Form.Control
              type="number"
              name="Feed-in Tariff (FiT)"
              value={CSElectricData.feed_in_tariff}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "feed_in_tariff",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Annual Day Usage (kWh)</Form.Label>
            <Form.Control
              type="number"
              name="Annual Day Usage (kWh)"
              value={CSElectricData.annual_day_usage}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "annual_day_usage",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Day Rate (pence/kWh)</Form.Label>
            <Form.Control
              type="number"
              name="Day Rate (pence/kWh)"
              value={CSElectricData.day_rate}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "day_rate",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Annual Night Usage (kWh)</Form.Label>
            <Form.Control
              type="number"
              name="Annual Night Usage (kWh)"
              value={CSElectricData.annual_night_usage}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "annual_night_usage",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-3">
            <Form.Label>Night Rate (pence/kWh)</Form.Label>
            <Form.Control
              type="number"
              name="Night Rate (pence/kWh)"
              value={CSElectricData.night_rate}
              onChange={(e) =>
                dispatchCSElectricityData({
                  type: "night_rate",
                  value: e.target.value,
                })
              }
            />
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

export default CurrentSupplyElectricity;
