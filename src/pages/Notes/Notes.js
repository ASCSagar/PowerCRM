import { useState } from "react";
import NotesForm from "../../components/Notes/NotesForm";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import { Link } from "react-router-dom";
import useDTColumns from "../../hooks/useDTColumns";
import DTable from "../../components/DTable";

const Notes = () => {
  const [refreshTable, setRefreshTable] = useState(true);

  const columns = [
    {
      cell: (row) => (
        <>
          <Link to={`/notes/edit/${row.id}`}>
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
      name: "Site",
      selector: (row) => row.select_site,
      sortable: true,
    },
    {
      name: "Site Note",
      selector: (row) => row.site_notes,
      sortable: true,
    },
    {
      name: "Company Note",
      selector: (row) => row.company_notes,
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
      <NotesForm
        setRefreshTable={setRefreshTable}
        refreshTableEditMode={refreshTableEditMode}
      />
      <NeumorphismWrapper>
      {renderColBtns()}
        <DTable
          url="notes/note/?"
          openPopup={openPopup}
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </>
  );
};
export default Notes;
