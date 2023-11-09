import React, { useState } from "react";
import DTable from "../../components/DTable";
import { Link } from "react-router-dom";
import useDTColumns from "../../hooks/useDTColumns";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import UiModal from "../../components/UI/UiModal";
import SitesDT from "../../components/Group Sites/SitesDT";

const GroupQuotes = () => {
  const [refreshTable, setRefreshTable] = useState(true);

  const [showSites, SetShowSites] = useState({
    total: null,
    show: false,
    sites: [],
    groupId: "",
  });

  const DTableFunction = function (data) {
    return data;
  };

  const columns = [
    {
      cell: (row) => (
        <>
          <Link
            to={`/group-quotes/edit/${row.id}`}
            className="enquiryAction"
            title="Edit Group Quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-edit-2 p-1 br-8 mb-1"
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
      name: "Group Details",
      selector: (row) => (
        <span className="cursorPointer">
          {row.group_detail?.reduce((acc, data, id, arr) => {
            let addition = "";
            if (!(id === 0 || id === arr?.length - 1)) {
              addition += ", ";
            }
            return acc + data.supplier + addition;
          }, "")}
        </span>
      ),
    },
    {
      name: "Group Name",
      selector: (row) => row.group_name,
    },
  ];

  const hideModal = () =>
    SetShowSites({ total: null, show: false, sites: [], groupId: "" });

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);

  return (
    <>
      {showSites.show ? (
        <UiModal
          showStatus={showSites.show}
          setModalStatus={hideModal}
          showHeader={true}
          title={`Group Quote List`}
          body={<SitesDT data={showSites} setRefreshTable={setRefreshTable} />}
        />
      ) : (
        ""
      )}
      <NeumorphismWrapper>
        {renderColBtns()}
        <div className="text-right mb-3">
          <Link to="/group-quotes/add" className="btn" style={{backgroundColor:"#0097b2"}}>
            Add Group Quotes
          </Link>
        </div>
        <DTable
          url="quote/group-quote/?ordering=-date_created"
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </>
  );
};

export default GroupQuotes;
