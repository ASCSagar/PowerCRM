import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import { Tab, Tabs } from "react-bootstrap";
import { quoteColumns } from "../Quotes";
import useDTColumns from "../../hooks/useDTColumns";
import DTable from "../../components/DTable"; 
import { DTableFunction } from ".";
import SupplyDetails from "../../components/Supply Details/SupplyDetails";

const DashboardSite = () => {
  const [key, setKey] = useState(0);
  const [siteData, setSiteData] = useState();
  const [refreshTable, setRefreshTable] = useState(true);
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(quoteColumns);

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  const paramsId = useParams().siteId;

  useEffect(() => {
    if (paramsId && !responseGetcompanyData) {
      setCompanyGETData({
        ...companyGETData,
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
    if (responseGetcompanyData) {
      setSiteData(responseGetcompanyData.data);
    }
  }, [paramsId, responseGetcompanyData]);

  const siteInfoCards = [
    {
      title: "Site Information",
      data: [
        { label: "Group Name", value: siteData?.group_name },
        { label: "Company Name", value: siteData?.contacts?.company },
        { label: "Type Of Owner", value: siteData?.type_of_owner },
        { label: "Owner Name", value: siteData?.owner_name },
        {
          label: "Current Gas And Electricity Supplier Details",
          value: siteData?.current_gas_and_electricity_supplier_details,
        },
        { label: "Tenant", value: siteData?.tenant ? "Yes" : "No" },
        { label: "Vacant", value: siteData?.vacant ? "Yes" : "No" },
        {
          label: "Change Of Tenancy",
          value: siteData?.change_of_tenancy ? "Yes" : "No",
        },
      ],
    },
    {
      title: "Our Details",
      data: [
        {
          label: "Site Reference",
          value: siteData?.site_reference,
        },
        {
          label: "Support Contact",
          value: siteData?.support_contact,
        },
        {
          label: "Lead Source",
          value: siteData?.lead_source,
        },
        {
          label: "Notes",
          value: siteData?.notes,
        },
        {
          label: "Lead Type",
          value: siteData?.lead_type,
        },
        { label: "Bill To Sent", value: siteData?.bill_to_sent ? "Yes" : "No" },
        {
          label: "Welcome Letter Sent",
          value: siteData?.welcome_letter_send ? "Yes" : "No",
        },
      ],
    },
    {
      title: "Letter Of Authority",
      data: [
        {
          label: "Agent Email",
          value: siteData?.agent_email,
        },
        {
          label: "LOA Header To Use",
          value: siteData?.loa_header_to_use,
        },
        {
          label: "LOA Template",
          value: siteData?.loa_template,
        },
      ],
    },
    {
      title: "Site Address",
      data: [
        {
          label: "Address Line 1",
          value: siteData?.site_address?.addressline1,
        },
        {
          label: "Address Line 2",
          value: siteData?.site_address?.addressline2,
        },
        {
          label: "Address Line 3",
          value: siteData?.site_address?.addressline3,
        },
        {
          label: "Address Line 4",
          value: siteData?.site_address?.addressline4,
        },
        {
          label: "Postcode",
          value: siteData?.site_address?.postcode,
        },
        {
          label: "Country",
          value: siteData?.site_address?.country,
        },
      ],
    },
    {
      title: "Billing Address",
      data: [
        {
          label: "Address Line 1",
          value: siteData?.billing_address?.addressline1,
        },
        {
          label: "Address Line 2",
          value: siteData?.billing_address?.addressline2,
        },
        {
          label: "Address Line 3",
          value: siteData?.billing_address?.addressline3,
        },
        {
          label: "Address Line 4",
          value: siteData?.billing_address?.addressline4,
        },
        {
          label: "Postcode",
          value: siteData?.billing_address?.postcode,
        },
        {
          label: "Country",
          value: siteData?.billing_address?.country,
        },
      ],
    },
    {
      title: "Contact",
      data: [
        {
          label: "First Name",
          value: siteData?.contacts?.first_name,
        },
        {
          label: "Last Name",
          value: siteData?.contacts?.last_name,
        },
        {
          label: "Contact Title",
          value: siteData?.contacts?.contact_title,
        },
        {
          label: "Position",
          value: siteData?.contacts?.position,
        },
        {
          label: "Telephone Number",
          value: siteData?.contacts?.telephone_number,
        },
        {
          label: "Email",
          value: siteData?.contacts?.email,
        },
      ],
    },
  ];

  return (
    <>
      <NeumorphismWrapper>
        <div className="text-center">
          <h4>{siteData?.site_name}</h4>
        </div>
        <div>
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(+k)}
            id="controlled-tab-example"
            className="mb-3"
          >
            <Tab eventKey={0} title="Site">
              <div className="gridContainer">
                {siteInfoCards.map((card, index) => (
                  <div className="cardWrapperMain" key={index}>
                    <div className="cardHeader">{card.title}</div>
                    <div className="cardBody">
                      {card.data.map((item, itemIndex) => (
                        <p key={itemIndex}>
                          <span className="itemLabel">{item.label} : </span>{" "}
                          {item.value}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey={1} title="Quotes">
              <div>
                {renderColBtns()}
                <DTable
                  url={`quote/generate-quote/?site=${paramsId}`}
                  transformFunction={DTableFunction}
                  columns={cols}
                  refreshTable={refreshTable}
                  setRefreshTable={setRefreshTable}
                />
              </div>
            </Tab>
            <Tab eventKey={2} title="Supply Details">
              <SupplyDetails />
            </Tab>
          </Tabs>
        </div>
      </NeumorphismWrapper>
    </>
  );
};

export default DashboardSite;
