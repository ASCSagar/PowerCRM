import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingData from "../../components/UI/LoadingData";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import { Tab, Tabs } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import useDTColumns from "../../hooks/useDTColumns";
import DTable from "../../components/DTable";
import { DTableFunction, siteColumns } from "../Sites";

const DashboardCompany = () => {
  const [key, setKey] = useState(0);
  const [companyData, setCompanyData] = useState();
  const [refreshTable, setRefreshTable] = useState(true);
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(siteColumns);

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  const paramsId = useParams().companyId;

  useEffect(() => {
    if (paramsId && !responseGetcompanyData) {
      setCompanyGETData({
        ...companyGETData,
        url: `company/${paramsId}/`,
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
      setCompanyData(responseGetcompanyData.data);
    }
  }, [paramsId, responseGetcompanyData]);

  if (reqGetCompanyStatus.isLoading) {
    return (
      <div className="text-center">
        <LoadingData />
      </div>
    );
  }

  return (
    <>
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
              <Table>
                <tr>
                  <th>Company Information</th>
                  <td>Parent Company : {companyData?.parent_company}</td>
                  <td>Reference : {companyData?.reference}</td>
                  <td>No Of Employees : {companyData?.number_of_employees}</td>
                  <td>Registration No : {companyData?.registration_no}</td>
                  <td>Company Type : {companyData?.business_type}</td>
                  <td>
                    Estimated Turnover : {companyData?.estimated_turnover}
                  </td>
                  <td>
                    Micro Business :{" "}
                    {companyData?.is_macro_business ? "Yes" : "No"}
                  </td>
                </tr>
                <tr>
                  <th>Company Address</th>
                  <td>Address Line 1 : {companyData?.addressline1_company}</td>
                  <td>Address Line 2 : {companyData?.addressline2_company}</td>
                  <td>Address Line 3 : {companyData?.addressline3_company}</td>
                  <td>Postcode : {companyData?.postcode}</td>
                  <td>Country : {companyData?.country_of_company}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>Bank Details</th>
                  <td>Account Name : {companyData?.account_name}</td>
                  <td>Bank Name : {companyData?.bank_name}</td>
                  <td>Account No : {companyData?.account_no}</td>
                  <td>Shortcode : {companyData?.shortcode}</td>
                  <td>SIC Code : {companyData?.sic_code}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>Partner Details</th>
                  <td>Partner Name : {companyData?.partner_name}</td>
                  <td>Partner DOB : {companyData?.partner_dob}</td>
                  <td>Address : {companyData?.address}</td>
                  <td>Home Postcode : {companyData?.home_post_code}</td>
                  <td>
                    Time At Address (Years) :{" "}
                    {companyData?.time_at_address_years}
                  </td>
                  <td>
                    Time At Address (Months) :{" "}
                    {companyData?.time_at_address_months}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th>Contact</th>
                  <td>First Name : {companyData?.contacts?.first_name}</td>
                  <td>Last Name : {companyData?.contacts?.last_name}</td>
                  <td>
                    Contact Title : {companyData?.contacts?.contact_title}
                  </td>
                  <td>Position : {companyData?.contacts?.position}</td>
                  <td>
                    Telephone Number : {companyData?.contacts?.telephone_number}
                  </td>
                  <td>Email : {companyData?.contacts?.email}</td>
                  <td></td>
                </tr>
              </Table>
            </Tab>
            <Tab eventKey={1} title="Sites">
              <div>
                {renderColBtns()}
                <DTable
                  url={`sites/get/site/?company=${paramsId}`} 
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
    </>
  );
}

export default DashboardCompany;
