import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import LoadingData from "./UI/LoadingData";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";

function DTable(props) {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const currentPath = useLocation().pathname;

  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPageNo(page);
    setResponseData(null);
    setData([]);
  };

  useEffect(() => {
    if (props.refreshTable) {
      props.setRefreshTable(false);
      setResponseData(null);
    }
  }, [props.refreshTable]);

  useEffect(() => {
    if (!responseData) {
      let url = `${props.url}&p=${pageNo}&records=${perPage}`;
      setSendReqData({
        ...sendReqData,
        url,
        fetchObj: {
          method: "GET",
        },
        isAuthNeeded: true,
        expectStatusCode: [200],
      });
    } else if (responseData && !reqStatus.isLoading) {
      setTotalRows(responseData.data.count);
      setData(props.transformFunction(responseData.data.results));
    }
  }, [props.url, responseData, reqStatus, pageNo, perPage]);

  useEffect(() => {
    if (currentPath === "/group-sites" && data) {
      if (props.showSites?.groupId) {
        const sites = data.find((data) => {
          return data.id === props.showSites.groupId;
        });
        props.SetShowSites({
          ...props.showSites,
          total: sites.sites?.length,
          show: true,
          sites: sites.sites,
        });
      }
    }
  }, [currentPath, data]);
  
  return (
    <DataTable
      onChangePage={(page) => {
        setPageNo(page);
        setData([]);
        setResponseData(null);
      }}
      onChangeRowsPerPage={handlePerRowsChange}
      columns={props.columns}
      data={data}
      progressPending={reqStatus.isLoading}
      progressComponent={<LoadingData className="loading-spinner-flex" />}
      paginationTotalRows={totalRows}
      key={totalRows}
      pagination
      paginationServer
    />
  );
}

export default DTable;
