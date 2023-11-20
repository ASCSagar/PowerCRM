import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingData from "../../components/UI/LoadingData";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import { Tab, Tabs } from "react-bootstrap";
import useDTColumns from "../../hooks/useDTColumns";
import DTable from "../../components/DTable";
import { DTableFunction, siteColumns } from "../Sites";

const DashboardCompany = () => {
  const [key, setKey] = useState(0);
  const [companyData, setCompanyData] = useState();
  const [refreshTable, setRefreshTable] = useState(true);
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(siteColumns);

  const { companyId } = useParams();

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetCompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if (companyId && !responseGetCompanyData) {
      setCompanyGETData({
        ...companyGETData,
        url: `company/${companyId}/`,
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
    if (responseGetCompanyData) {
      setCompanyData(responseGetCompanyData.data);
    }
  }, [companyId, responseGetCompanyData]);

  if (reqGetCompanyStatus.isLoading) {
    return (
      <div className="text-center">
        <LoadingData />
      </div>
    );
  }
    
  const companyInfoCards = [
    {
      title: "Company Information",
      data: [
        { label: "Parent Company", value: companyData?.parent_company },
        { label: "Reference", value: companyData?.reference },
        { label: "No Of Employees", value: companyData?.number_of_employees },
        { label: "Registration No", value: companyData?.registration_no },
        { label: "Company Type", value: companyData?.business_type },
        { label: "Estimated Turnover", value: companyData?.estimated_turnover },
        {
          label: "Micro Business",
          value: companyData?.is_macro_business ? "Yes" : "No",
        },
      ],
    },
    {
      title: "Company Address",
      data: [
        { label: "Address Line 1", value: companyData?.addressline1_company },
        { label: "Address Line 2", value: companyData?.addressline2_company },
        { label: "Address Line 3", value: companyData?.addressline3_company },
        { label: "Postcode", value: companyData?.postcode },
        { label: "Country", value: companyData?.country_of_company },
      ],
    },
    {
      title: "Bank Details",
      data: [
        { label: "Account Name", value: companyData?.account_name },
        { label: "Bank Name", value: companyData?.bank_name },
        { label: "Account No", value: companyData?.account_no },
        { label: "Shortcode", value: companyData?.shortcode },
        { label: "SIC Code", value: companyData?.sic_code },
      ],
    },
    {
      title: "Partner Details",
      data: [
        { label: "Partner Name", value: companyData?.partner_name },
        { label: "Partner DOB", value: companyData?.partner_dob },
        { label: "Address", value: companyData?.address },
        { label: "Home Postcode", value: companyData?.home_post_code },
        {
          label: "Time At Address (Years)",
          value: companyData?.time_at_address_years,
        },
        {
          label: "Time At Address (Months)",
          value: companyData?.time_at_address_months,
        },
      ],
    },
    {
      title: "Contact",
      data: [
        { label: "First Name", value: companyData?.contacts?.first_name },
        { label: "Last Name", value: companyData?.contacts?.last_name },
        { label: "Contact Title", value: companyData?.contacts?.contact_title },
        { label: "Position", value: companyData?.contacts?.position },
        {
          label: "Telephone Number",
          value: companyData?.contacts?.telephone_number,
        },
        { label: "Email", value: companyData?.contacts?.email },
      ],
    },
  ];

  return (
    <NeumorphismWrapper>
      <div className="text-center">
        <h4>{companyData?.name}</h4>
      </div>
      <div>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(+k)}
          id="controlled-tab-example"
          className="mb-3"
        >
          <Tab eventKey={0} title="Company">
            <div className="gridContainer">
              {companyInfoCards.map((card, index) => (
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
          <Tab eventKey={1} title="Sites">
            <div>
              {renderColBtns()}
              <DTable
                url={`sites/get/site/?company=${companyId}`}
                transformFunction={DTableFunction}
                columns={cols}
                refreshTable={refreshTable}
                setRefreshTable={setRefreshTable}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </NeumorphismWrapper>
  );
}

export default DashboardCompany;
