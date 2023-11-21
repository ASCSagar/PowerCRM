import React, { useState } from "react";
import DTable from "../../components/DTable";
import { Link } from "react-router-dom";
import UiModal from "../../components/UI/UiModal";
import SitesDT from "../../components/Group Sites/SitesDT";
import GroupSiteForm from "../../components/Group Sites/GroupSiteForm";
import useDTColumns from "../../hooks/useDTColumns";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";

function GroupSites() {
  const [showSites, SetShowSites] = useState({
    total: null,
    show: false,
    sites: [],
    groupId: "",
  });

  const [refreshTable, setRefreshTable] = useState(true);
  const hideModal = () =>
    SetShowSites({ total: null, show: false, sites: [], groupId: "" });

  const columns = [
    {
      cell: (row) => (
        <>
          <Link to={`/group-sites/edit/${row.id}`}>
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
      name: "Group Name",
      selector: (row) => row.group_name,
      sortable: true,
    },
    {
      name: "Sites In Group",
      selector: (row) => (
        <span
          className="cursorPointer"
          onClick={() =>
            SetShowSites({
              total: row.sites?.length,
              show: true,
              sites: row.sites,
              groupId: row.id,
            })
          }
        >
          {row.sites?.length}
        </span>
      ),
    },
    {
      name: "Group Type",
      selector: (row) =>
        row.group_type === "MULTI"
          ? "Multi Site GROUP"
          : row.group_type === "BASIC"
          ? "BASIC SITE GROUP"
          : "",
      sortable: true,
    },
  ];

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);

  const DTableFunction = function (data) {
    return data;
  };

  const refreshTableEditMode = function () {
    setRefreshTable(true);
  };

  const openPopup = function () {};

  return (
    <>
      <GroupSiteForm
        setRefreshTable={setRefreshTable}
        refreshTableEditMode={refreshTableEditMode}
      />
      {showSites.show ? (
        <UiModal
          showStatus={showSites.show}
          setModalStatus={hideModal}
          showHeader={true}
          title={`Site List`}
          body={<SitesDT data={showSites} setRefreshTable={setRefreshTable} />}
        />
      ) : (
        ""
      )}
      <NeumorphismWrapper>
        {renderColBtns()}
        <DTable
          url="multisite/?ordering=-date_created"
          openPopup={openPopup}
          showSites={showSites}
          SetShowSites={SetShowSites}
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </>
  );
}

export default GroupSites;
