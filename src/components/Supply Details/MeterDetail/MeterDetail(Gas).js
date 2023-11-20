import React, { useEffect, useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { uiAction } from "../../../store/uiStore";
import { useParams } from "react-router-dom";
import LoadingData from "../../UI/LoadingData";

const initialMeterDetailsGas = {
  g_mpr: "",
  g_serial_number: "",
  g_smart_meter: false,
  g_igt_meter: false,
  g_green_deal: false,
};

const reducerMDG = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const MeterDetailGas = () => {
  const [meterGasData, dispatchmeterGasData] = useReducer(
    reducerMDG,
    initialMeterDetailsGas
  );
  const dispatch = useDispatch();
  const paramsId = useParams().siteId;

  const [
    sendMeterGasData,
    setMeterGasReqData,
    reqStatus,
    responseMGData,
    setMeterGasResponseData,
    setStatus,
  ] = useFetch();

  const [
    meterGasGetData,
    setMeterGasGetData,
    reqGetMeterGasStatus,
    responseMeterGasData,
    setMeterGasGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if ((paramsId, !responseMeterGasData)) {
      setMeterGasGetData({
        ...meterGasGetData,
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
    if (responseMeterGasData) {
      const responseData = {
        g_mpr: responseMeterGasData.data.g_mpr,
        g_serial_number: responseMeterGasData.data.g_serial_number,
        g_smart_meter: responseMeterGasData.data.g_smart_meter,
        g_igt_meter: responseMeterGasData.data.g_igt_meter,
        g_green_deal: responseMeterGasData.data.g_green_deal,
      };
      dispatchmeterGasData({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseMeterGasData]);

  const MeterDetailsGas = async function (e) {
    e.preventDefault();
    let sendData = {
      g_mpr: meterGasData.g_mpr,
      g_serial_number: meterGasData.g_serial_number,
      g_smart_meter: meterGasData.g_smart_meter,
      g_igt_meter: meterGasData.g_igt_meter,
      g_green_deal: meterGasData.g_green_deal,
    };
    setMeterGasResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setMeterGasReqData({
      ...sendMeterGasData,
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
    if (responseMGData) {
      dispatch(
        uiAction.setNotification({
          show: true,
          msg: `Meter Details For GAS Added Successfully`,
        })
      );
      dispatchmeterGasData({ reset: true, value: initialMeterDetailsGas });
    }
  }, [responseMGData]);

  if (reqGetMeterGasStatus.isLoading) {
    return <LoadingData className="text-center" />;
  }

  return (
    <Form onSubmit={MeterDetailsGas}>
      <div className="row">
        <Form.Group className="mb-3 col-md-3">
          <Form.Label>MRP</Form.Label>
          <Form.Control
            type="text"
            name="MRP"
            value={meterGasData.g_mpr}
            onChange={(e) =>
              dispatchmeterGasData({
                type: "g_mpr",
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
            value={meterGasData.g_serial_number}
            onChange={(e) =>
              dispatchmeterGasData({
                type: "g_serial_number",
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
              checked={meterGasData.g_smart_meter}
              onChange={(e) => {
                dispatchmeterGasData({
                  type: "g_smart_meter",
                  value: e.target.checked,
                });
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="IGT Meter"
              checked={meterGasData.g_igt_meter}
              onChange={(e) => {
                dispatchmeterGasData({
                  type: "g_igt_meter",
                  value: e.target.checked,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Green Deal"
              checked={meterGasData.g_green_deal}
              onChange={(e) => {
                dispatchmeterGasData({
                  type: "g_green_deal",
                  value: e.target.checked,
                });
              }}
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

export default MeterDetailGas;
