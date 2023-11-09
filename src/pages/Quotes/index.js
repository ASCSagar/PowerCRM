import React, { useState } from "react";
import DTable from "../../components/DTable";
import { Link } from "react-router-dom";
import useDTColumns from "../../hooks/useDTColumns";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
import { DTableFunction } from "../Sites";

export const quoteColumns = [
  {
    cell: (row) => (
      <>
        <Link
          to={`/quotes/edit/${row.id}`}
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
    name: "Site",
    selector: (row) => row.site?.site_name,
    sortable: true,
  },
  {
    name: "Supplier",
    selector: (row) => row.supplier,
  },
  {
    name: "Product",
    selector: (row) => row.product,
  },
  {
    name: "Term",
    selector: (row) => row.term,
  },
  {
    name: "Day Rate (pence/kwh)",
    selector: (row) => row.day_rate,
  },
  {
    name: "Night Rate (pence/kwh)",
    selector: (row) => row.night_rate,
  },
  {
    name: "Standing Charge (pence)",
    selector: (row) => row.standing_charge,
  },
  {
    name: "KVA Charge (pence)",
    selector: (row) => row.kva_charge,
  },
  {
    name: "Additional Charge(£)",
    selector: (row) => row.additional_charge,
  },
  {
    name: "Extra info ",
    selector: (row) => row.extra_info,
  },
  {
    name: "Up Lift",
    selector: (row) => row.up_lift,
  },
  {
    name: "Rates Already Include At Uplift",
    selector: (row) => (row.rates_already_include_at_uplift ? "YES" : "NO"),
  },
];

const Quote = () => {
  const [refreshTable, setRefreshTable] = useState(true);
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(quoteColumns);

  return (
    <>
      <NeumorphismWrapper>
        {renderColBtns()}
        <div className="text-right mb-3">
          <Link to="/quotes/add" className="btn" style={{backgroundColor:"#0097b2"}}>
            Add Quote
          </Link>
        </div>
        <DTable
          url="quote/generate-quote/?ordering=-date_created"
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </>
  );
};

export default Quote;
