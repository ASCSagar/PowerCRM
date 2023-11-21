import React, { useState } from "react";
import DTable from "../../components/DTable";
import { Link } from "react-router-dom";
import CreateCompany from "../../components/Companies/CreateCompany";
import useDTColumns from "../../hooks/useDTColumns";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";

function Companies() {
  const [refreshTable, setRefreshTable] = useState(true);
  const columns = [
    {
      cell: (row) => (
        <>
          <Link
            to={`/companies/edit/${row.id}`}
            className="enquiryAction"
            title="Edit Company "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-edit-2 p-1 br-8 mb-1"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </Link>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Company Name",
      selector: (row) => (
        <Link
          to={`/companies/${row.id}`}
          className="enquiryAction"
          title="Company Details"
        >
          {row.name}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Number Of Employees",
      selector: (row) => row.number_of_employees,
    },
    {
      name: "Registration Number",
      selector: (row) => row.registration_no,
    },
    {
      name: "Estimated Turnover",
      selector: (row) => row.estimated_turnover,
    },
    {
      name: "Account Name",
      selector: (row) => row.account_name,
    },
    {
      name: "Account No",
      selector: (row) => row.account_no,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Address line1",
      selector: (row) => row.addressline1_company,
    },
    {
      name: "Address line2",
      selector: (row) => row.addressline2_company,
    },
    {
      name: "Address line3",
      selector: (row) => row.addressline3_company,
    },
    {
      name: "Bank Name",
      selector: (row) => row.bank_name,
    },
    {
      name: "Business Type",
      selector: (row) => row.business_type,
    },
    {
      name: "Country Of Company",
      selector: (row) => row.country_of_company,
    },
    {
      name: "Home Postcode",
      selector: (row) => row.home_post_code,
    },
    {
      name: "Macro Business",
      selector: (row) => (row.is_macro_business ? "YES" : "NO"),
    },
    {
      name: "Partner DOB",
      selector: (row) => row.partner_dob,
    },
    {
      name: "Partner Name",
      selector: (row) => row.partner_name,
    },
    {
      name: "Registration No",
      selector: (row) => row.registration_no,
    },
    {
      name: "Shortcode",
      selector: (row) => row.shortcode,
    },
    {
      name: "Postcode",
      selector: (row) => row.postcode,
    },
  ];

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);

  const DTableFunction = function (data) {
    return data;
  };

  return (
    <>
      <CreateCompany setRefreshTable={setRefreshTable} />
      <NeumorphismWrapper>
        {renderColBtns()}
        <DTable
          url="company/?ordering=-date_created"
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </>
  );
}

export default Companies;
