import React, { useEffect, useReducer, useState } from "react";
import SelectionBox from "../Form/SelectionBox";
import { Button, Form } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiAction } from "../../store/uiStore";
import LoadingData from "../UI/LoadingData";
import SiteDetails from "./SiteDetails";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";

const initialQuoteState = {
  site: "",
  supplier: "",
  product: "",
  term: "",
  dayRate: "",
  nightRate: "",
  standingCharge: "",
  kvaCharge: "",
  additionalCharge: "",
  extraInfo: "",
  upLift: "",
  rateIncludedInUplift: false,
};

const QuoteReducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const QuoteForm = (props) => {
  const [quoteForm, dispatchInputChange] = useReducer(
    QuoteReducer,
    initialQuoteState
  );

  const [err, setErr] = useState("");

  const dispatch = useDispatch();
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

  const navigate = useNavigate();

  const handleSelectionChange = function (type, value) {
    dispatchInputChange({ type, value });
  };

  const createQuotes = function (e) {
    e.preventDefault();
    if (!quoteForm.site) {
      setErr("Site Name is required");
      return;
    } else if (!quoteForm.supplier) {
      setErr("supplier is required");
      return;
    } else if (!quoteForm.product) {
      setErr("product is required");
      return;
    } else if (!quoteForm.term) {
      setErr("term is required");
      return;
    } else if (!quoteForm.dayRate) {
      setErr("Day Rate is required");
      return;
    } else if (!quoteForm.nightRate) {
      setErr("Night Rate is required");
      return;
    } else if (!quoteForm.standingCharge) {
      setErr("Standing Charge is required");
      return;
    } else if (!quoteForm.kvaCharge) {
      setErr("Kva Charge is required");
      return;
    } else if (!quoteForm.upLift) {
      setErr("Up Lift is required");
      return;
    }
    let sendData = {
      additional_charge: quoteForm.additionalCharge,
      day_rate: quoteForm.dayRate,
      extra_info: quoteForm.extraInfo,
      kva_charge: quoteForm.kvaCharge,
      night_rate: quoteForm.nightRate,
      product: quoteForm.product,
      rates_already_include_at_uplift: quoteForm.rateIncludedInUplift,
      site: quoteForm.site,
      standing_charge: quoteForm.standingCharge,
      supplier: quoteForm.supplier,
      term: quoteForm.term,
      up_lift: quoteForm.upLift,
    };
    setCompanyResponseData(null);
    let url = `quote/generate-quote/`,
      method = "POST";
    if (props.quoteId) {
      url = `quote/generate-quote/${props.quoteId}/`;
      method = "PATCH";
    }
    setCompanyReqData({
      ...sendcompanyData,
      url,
      fetchObj: {
        method,
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
        navigate("/quotes");
        dispatch(
          uiAction.setNotification({
            show: true,
            heading: "Quote",
            msg: `${
              props.isEdit
                ? "Quote Edited Succesfully"
                : "Quote Created Succesfully"
            }`,
          })
        );
      } else {
        setErr("Some Proble Occured, Please try again");
      }
    }
  }, [responsecompanyData]);

  useEffect(() => {
    if (props.quoteId && !responseGetcompanyData) {
      setCompanyGetResponseData(null);
      setCompanyGETData({
        ...companyGETData,
        url: `quote/generate-quote/${props.quoteId}/`,
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
      if (responseGetcompanyData?.status === 200) {
        dispatchInputChange({
          all: true,
          data: {
            site: responseGetcompanyData?.data?.site?.id,
            supplier: responseGetcompanyData?.data?.supplier,
            product: responseGetcompanyData?.data?.product,
            term: responseGetcompanyData?.data?.term,
            dayRate: responseGetcompanyData?.data?.day_rate,
            nightRate: responseGetcompanyData?.data?.night_rate,
            standingCharge: responseGetcompanyData?.data?.standing_charge,
            kvaCharge: responseGetcompanyData?.data?.kva_charge,
            additionalCharge: responseGetcompanyData?.data?.additional_charge,
            extraInfo: responseGetcompanyData?.data?.extra_info,
            upLift: responseGetcompanyData?.data?.up_lift,
            rateIncludedInUplift:
              responseGetcompanyData?.data?.rates_already_include_at_uplift,
          },
        });
      }
    }
  }, [props.quoteId, responseGetcompanyData]);

  const btnTitle = props.quoteId ? "Edit" : "Create";

  if (reqGetCompanyStatus.isLoading) {
    return (
      <div className="text-center">
        <LoadingData />
      </div>
    );
  }

  return (
    <NeumorphismWrapper>
      <div className="widget-header">
        <h4>{props.title}</h4>
      </div>
      <div className="row">
        <Form onSubmit={createQuotes} className="col-md-6 row">
          <SelectionBox
            groupClass="mb-3 col-md-6 selectbox"
            groupId="site"
            label="Site Name"
            value={quoteForm.site}
            onChange={handleSelectionChange.bind(null, "site")}
            name="site"
            isSearch={true}
            objKey="site_name"
            url="sites/get/site/?pagination=false&brief=true"
          />
          <Form.Group className="mb-3 col-6" controlId="supplier">
            <Form.Label>Supplier</Form.Label>
            <Form.Control
              type="text"
              name="supplier"
              value={quoteForm.supplier}
              onChange={(e) =>
                dispatchInputChange({
                  type: "supplier",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="product">
            <Form.Label>Product</Form.Label>
            <Form.Control
              type="text"
              name="product"
              value={quoteForm.product}
              onChange={(e) =>
                dispatchInputChange({
                  type: "product",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="term">
            <Form.Label>Term</Form.Label>
            <Form.Control
              type="number"
              name="term"
              value={quoteForm.term}
              onChange={(e) =>
                dispatchInputChange({
                  type: "term",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="dayRate">
            <Form.Label>Day Rate (pence/kWh)</Form.Label>
            <Form.Control
              type="number"
              name="dayRate"
              value={quoteForm.dayRate}
              onChange={(e) =>
                dispatchInputChange({
                  type: "dayRate",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="nightRate">
            <Form.Label>Night Rate (pence/kWh)</Form.Label>
            <Form.Control
              type="number"
              name="nightRate"
              value={quoteForm.nightRate}
              onChange={(e) =>
                dispatchInputChange({
                  type: "nightRate",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="standingCharge">
            <Form.Label>Standing Charge (pence)</Form.Label>
            <Form.Control
              type="number"
              name="standingCharge"
              value={quoteForm.standingCharge}
              onChange={(e) =>
                dispatchInputChange({
                  type: "standingCharge",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="kvaCharge">
            <Form.Label>KVA Charge (pence)</Form.Label>
            <Form.Control
              type="number"
              name="kvaCharge"
              value={quoteForm.kvaCharge}
              onChange={(e) =>
                dispatchInputChange({
                  type: "kvaCharge",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="name">
            <Form.Label>Additional Charge(£)</Form.Label>
            <Form.Control
              type="number"
              name="additionalCharge"
              value={quoteForm.additionalCharge}
              onChange={(e) =>
                dispatchInputChange({
                  type: "additionalCharge",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="extraInfo">
            <Form.Label>Extra Info</Form.Label>
            <Form.Control
              type="text"
              name="extraInfo"
              value={quoteForm.extraInfo}
              onChange={(e) =>
                dispatchInputChange({
                  type: "extraInfo",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="upLift">
            <Form.Label>Up Lift</Form.Label>
            <Form.Control
              type="number"
              name="upLift"
              value={quoteForm.upLift}
              onChange={(e) =>
                dispatchInputChange({
                  type: "upLift",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="name">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Rates Already Include At UpLift"
              checked={quoteForm.rateIncludedInUplift}
              onChange={(e) => {
                dispatchInputChange({
                  type: "rateIncludedInUplift",
                  value: e.target.checked,
                });
              }}
            />
          </Form.Group>
          <div className="col-md-12 text-center">
            {err ? <p className="text-center red">{err}</p> : ""}
            <Button type="submit">
              {reqCompanyStatus.isLoading
                ? `${btnTitle} Quotes`
                : `${btnTitle} Quotes`}
            </Button>
          </div>
        </Form>
        {quoteForm.site && (
          <div className="col-md-6">
            <SiteDetails siteId={quoteForm.site} />
          </div>
        )}
      </div>
    </NeumorphismWrapper>
  );
};

export default QuoteForm;
