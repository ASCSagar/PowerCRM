import React, { useEffect, useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { uiAction } from "../../../store/uiStore";
import LoadingData from "../../UI/LoadingData";

const initialMeterDetailsElectricity = {
  e_mpan_topline: "",
  e_mpan_bottomline: "",
  e_meter_type: "",
  e_serial_number: "",
  e_capacity: "",
  e_voltage:"",
  e_measurement_class: "",
  e_smart_meter: false,
  e_related_meter: false,
  e_ley_meter: false,
  e_green_deal: false,
};

const reducerMDE = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const MeterDetailElectricity = () => {
  const [meterElectricityData, dispatchmeterElectricityData] = useReducer(
    reducerMDE,
    initialMeterDetailsElectricity
  );
  const dispatch = useDispatch();
  const paramsId = useParams().siteId;

  const [
    sendMeterElectricityData,
    setMeterElectricityReqData,
    reqStatus,
    responseMEData,
    setMeterElectricityResponseData,
    setStatus,
  ] = useFetch();

  const [
    meterElectricityGetData,
    setMeterElectricityGetData,
    reqGetMeterElectricityStatus,
    responseMeterElectricityData,
    setMeterElectricityGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if ((paramsId, !responseMeterElectricityData)) {
      setMeterElectricityGetData({
        ...meterElectricityGetData,
        url: `supply/meter-detail/${paramsId}/`,
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
    if (responseMeterElectricityData) {
      const responseData = {
        e_mpan_topline: responseMeterElectricityData.data.e_mpan_topline,
        e_mpan_bottomline: responseMeterElectricityData.data.e_mpan_bottomline,
        e_meter_type: responseMeterElectricityData.data.e_meter_type,
        e_serial_number: responseMeterElectricityData.data.e_serial_number,
        e_capacity: responseMeterElectricityData.data.e_capacity,
        e_measurement_class:
          responseMeterElectricityData.data.e_measurement_class,
        e_voltage:
          responseMeterElectricityData.data.e_voltage,
        e_smart_meter: responseMeterElectricityData.data.e_smart_meter,
        e_related_meter: responseMeterElectricityData.data.e_related_meter,
        e_ley_meter: responseMeterElectricityData.data.e_ley_meter,
        e_green_deal: responseMeterElectricityData.data.e_green_deal,
      };
      dispatchmeterElectricityData({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseMeterElectricityData]);

  const MeterDetailsElectricity = async function (e) {
    e.preventDefault();
    let sendData = {
      e_mpan_topline: meterElectricityData.e_mpan_topline,
      e_mpan_bottomline: meterElectricityData.e_mpan_bottomline,
      e_meter_type: meterElectricityData.e_meter_type,
      e_serial_number: meterElectricityData.e_serial_number,
      e_capacity: meterElectricityData.e_capacity,
      e_voltage: meterElectricityData.e_voltage,
      e_measurement_class: meterElectricityData.e_measurement_class,
      e_smart_meter: meterElectricityData.e_smart_meter,
      e_related_meter: meterElectricityData.e_related_meter,
      e_ley_meter: meterElectricityData.e_ley_meter,
      e_green_deal: meterElectricityData.e_green_deal,
    };
    setMeterElectricityResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setMeterElectricityReqData({
      ...sendMeterElectricityData,
      url: `supply/meter-detail/${paramsId}/`,
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
    if (responseMEData) {
      dispatch(
        uiAction.setNotification({
          show: true,
          msg: `Meter Details For Electricity Added Successfully`,
        })
      );
      dispatchmeterElectricityData({
        reset: true,
        value: initialMeterDetailsElectricity,
      });
    }
  }, [responseMEData]);

  if (reqGetMeterElectricityStatus.isLoading) {
    return <LoadingData className="text-center" />;
  }
  return (
    <Form onSubmit={MeterDetailsElectricity}>
      <div className="row">
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>MPAN Top Line</Form.Label>
          <Form.Control
            type="text"
            name="MPAN Top Line"
            value={meterElectricityData.e_mpan_topline}
            onChange={(e) =>
              dispatchmeterElectricityData({
                type: "e_mpan_topline",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>MPAN Bottom Line</Form.Label>
          <Form.Control
            type="text"
            name="MPAN Bottom Line"
            value={meterElectricityData.e_mpan_bottomline}
            onChange={(e) =>
              dispatchmeterElectricityData({
                type: "e_mpan_bottomline",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Meter Type</Form.Label>
          <Form.Control
            type="text"
            name="Meter Type"
            value={meterElectricityData.e_meter_type}
            onChange={(e) =>
              dispatchmeterElectricityData({
                type: "e_meter_type",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Serial Number</Form.Label>
          <Form.Control
            type="text"
            name="Serial Number"
            value={meterElectricityData.e_serial_number}
            onChange={(e) =>
              dispatchmeterElectricityData({
                type: "e_serial_number",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Capacity (KVA)</Form.Label>
          <Form.Control
            type="text"
            name="Capacity (KVA)"
            value={meterElectricityData.e_capacity}
            onChange={(e) =>
              dispatchmeterElectricityData({
                type: "e_capacity",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Voltage</Form.Label>
          <Form.Control
            type="number"
            name="Voltage"
            value={meterElectricityData.e_voltage}
            onChange={(e) =>
              dispatchmeterElectricityData({
                type: "e_voltage",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>Measurement Class</Form.Label>
          <Form.Control
            type="text"
            name="Measurement Class"
            value={meterElectricityData.e_measurement_class}
            onChange={(e) =>
              dispatchmeterElectricityData({
                type: "e_measurement_class",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-start gap-2">
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Smart Meter (AMR)"
              checked={meterElectricityData.e_smart_meter}
              onChange={(e) =>
                dispatchmeterElectricityData({
                  type: "e_smart_meter",
                  value: e.target.checked,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Related Meter"
              checked={meterElectricityData.e_related_meter}
              onChange={(e) =>
                dispatchmeterElectricityData({
                  type: "e_related_meter",
                  value: e.target.checked,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Key Meter"
              checked={meterElectricityData.e_ley_meter}
              onChange={(e) =>
                dispatchmeterElectricityData({
                  type: "e_ley_meter",
                  value: e.target.checked,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Green Deal"
              checked={meterElectricityData.e_green_deal}
              onChange={(e) =>
                dispatchmeterElectricityData({
                  type: "e_green_deal",
                  value: e.target.checked,
                })
              }
            />
          </Form.Group>
        </div>
      </div>
      <Button variant="primary" type="submit" disabled={reqStatus.isLoading}>
        {reqStatus.isLoading ? "Submitting" : "Submit"}
      </Button>
    </Form>
  );
};

export default MeterDetailElectricity;
