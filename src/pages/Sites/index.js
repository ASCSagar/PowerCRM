import React, { useState } from "react";
import CreateSite from "../../components/Sites/CreateSite";
import DTable from "../../components/DTable";
import { Link } from "react-router-dom";
import useDTColumns from "../../hooks/useDTColumns";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";

export const siteColumns = [
  {
    cell: (row) => (
      <>
        <Link
          to={`/sites/edit/${row.id}`}
          className="enquiryAction"
          title="Edit Site "
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
    name: "Site Name",
    selector: (row) => (
      <Link
        to={`/sites/${row.id}`}
        className="enquiryAction"
        title="Site Details "
      >
        {row.site_name}
      </Link>
    ),
  },
  {
    name: "Type Of Owner",
    selector: (row) => row.type_of_owner,
  },
  {
    name: "Owner Name",
    selector: (row) => row.owner_name,
  },
  {
    name: "Company",
    selector: (row) => row.company.name,
  },
  {
    name: "Agent Email",
    selector: (row) => row.agent_email,
  },
  {
    name: "Bill To sent",
    selector: (row) => (row.bill_to_sent ? "YES" : "NO"),
  },
  {
    name: "Change Of Tenancy",
    selector: (row) => (row.change_of_tenancy ? "YES" : "NO"),
  },
  {
    name: "Customer Consent",
    selector: (row) => (row.customer_consent ? "YES" : "NO"),
  },
  {
    name: "Notes",
    selector: (row) => row.notes,
  },
];

export const DTableFunction = function (data) {
  return data;
};

const Site = () => {
  const [refreshTable, setRefreshTable] = useState(true);
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(siteColumns);

  return (
    <>
      <CreateSite siteCreated={() => {}} setRefreshTable={setRefreshTable} />
      <NeumorphismWrapper>
        {renderColBtns()}
        <DTable
          url="sites/get/site/?ordering=-date_created"
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </>
  );
};

export default Site;
