import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import UiModal from "../UI/UiModal";
import CreateSite from "../Sites/CreateSite";

function SitesDT(props) {
  const [createSiteModal, showCreateSiteModal] = useState(false);
  const columns = [
    {
      cell: (row) => (
        <>
          <Link
            to={`/sites/edit/${row.id}`}
            state={{ groupId: props.data.groupId }}
            className="enquiryAction"
            title="Edit Site"
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
      name: "Parent Company",
      selector: (row) => row.parent_company,
      sortable: true,
    },
    {
      name: "Site Name",
      selector: (row) => row.site_name,
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
  ];
  return (
    <div className="zI0">
      <DataTable
        columns={columns}
        data={props.data.sites}
        selectableRows
        key={props.totalRows}
        pagination
      />
      <div className="text-center">
        <Button
          variant="primary"
          onClick={() => {
            showCreateSiteModal(true);
          }}
        >
          Add Site
        </Button>
      </div>
      {createSiteModal ? (
        <UiModal
          showStatus={createSiteModal}
          setModalStatus={"hideModal"}
          showHeader={true}
          title={`Create Site`}
          body={
            <CreateSite
              groupId={props.data.groupId}
              siteCreated={() => {
                showCreateSiteModal(false);
                props.setRefreshTable(true);
              }}
            />
          }
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default SitesDT;
