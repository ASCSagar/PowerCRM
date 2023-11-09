import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import { Tab, Table, Tabs } from "react-bootstrap";
import { quoteColumns } from "../Quotes";
import useDTColumns from "../../hooks/useDTColumns";
import DTable from "../../components/DTable"; 
import { DTableFunction } from ".";

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
              <Table>
                <tr>
                  <th>Site Information</th>
                  <td>Group Name : {siteData?.group_name}</td>
                  <td>Company Name : {siteData?.contacts?.company}</td>
                  <td>Type Of Owner : {siteData?.type_of_owner}</td>
                  <td>Owner Name : {siteData?.owner_name}</td>
                  <td>
                    Current Gas And Electricity Supplier Details :{' '}
                    {siteData?.current_gas_and_electricity_supplier_details}
                  </td>
                  <td>Tenant : {siteData?.tenant ? "Yes" : "No"}</td>
                  <td>Vacant : {siteData?.vacant ? "Yes" : "No"}</td>
                  <td>
                    Change Of Tenancy :{" "}
                    {siteData?.change_of_tenancy ? "Yes" : "No"}
                  </td>
                </tr>
                <tr>
                  <th>Our Details</th>
                  <td>Site Reference : {siteData?.site_reference}</td>
                  <td>Support Contact : {siteData?.support_contact}</td>
                  <td>Lead Source : {siteData?.lead_source}</td>
                  <td>Notes : {siteData?.notes}</td>
                  <td>Lead Type : {siteData?.lead_type}</td>
                  <td>
                    Bill To Sent : {siteData?.bill_to_sent ? "Yes" : "No"}
                  </td>
                  <td>
                    Welcome Letter Sent :{" "}
                    {siteData?.welcome_letter_send ? "Yes" : "No"}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th>Letter Of Authority</th>
                  <td>Agent Email : {siteData?.agent_email}</td>
                  <td>LOA Header To Use : {siteData?.loa_header_to_use}</td>
                  <td>LOA Template : {siteData?.loa_template}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>Site Address</th>
                  <td>
                    Address Line 1 : {siteData?.site_address?.addressline1}
                  </td>
                  <td>
                    Address Line 2 : {siteData?.site_address?.addressline2}
                  </td>
                  <td>
                    Address Line 3 : {siteData?.site_address?.addressline3}
                  </td>
                  <td>
                    Address Line 4 : {siteData?.site_address?.addressline4}
                  </td>
                  <td>Postcode : {siteData?.site_address?.postcode}</td>
                  <td>Country : {siteData?.site_address?.country}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>  
                  <th>Billing Address</th>
                  <td>
                    Address Line 1 : {siteData?.billing_address?.addressline1}
                  </td>
                  <td>
                    Address Line 2 : {siteData?.billing_address?.addressline2}
                  </td>
                  <td>
                    Address Line 3 : {siteData?.billing_address?.addressline3}
                  </td>
                  <td>
                    Address Line 4 : {siteData?.billing_address?.addressline4}
                  </td>
                  <td>Postcode : {siteData?.billing_address?.postcode}</td> 
                  <td>Country : {siteData?.billing_address?.country}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>  
                  <th>Contact</th>
                  <td>First Name : {siteData?.contacts?.first_name}</td>
                  <td>Last Name : {siteData?.contacts?.last_name}</td>
                  <td>Contact Title : {siteData?.contacts?.contact_title}</td>
                  <td>Position : {siteData?.contacts?.position}</td>
                  <td>
                    Telephone Number : {siteData?.contacts?.telephone_number}
                  </td>
                  <td>Email : {siteData?.contacts?.email}</td>
                  <td></td>
                  <td></td>
                </tr>
              </Table>
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
          </Tabs>
        </div>
      </NeumorphismWrapper>
    </>
  );
}

export default DashboardSite;
