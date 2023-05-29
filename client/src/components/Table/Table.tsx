import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import styles from "./styles.module.sass";
import { Button } from "@mui/material";


interface ITable {
  handleOpenModal: (type: "add" | "edit", instanceId?: string) => void;
}

export const Table = (props: ITable) => {
  const { handleOpenModal } = props;

  const baseUrl = 'http://127.0.0.1:8000/shipments/all-shipments';
  const [previousPage, setPreviousPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getShipments(baseUrl);
  }, []);

  const getShipments = (url: string)=> {
    axios.get(`${url}`).then((response) => {
        setPreviousPage(response.data.previous)
        setNextPage(response.data.next)
        setShipments(response.data.results)
    });
  }

  const handleButtonClick = (instanceId?: string) => {
    handleOpenModal("edit", instanceId)
  }


  const columns: GridColDef[] = [
    { field: "title", headerName: "title", flex: 2 },
    { field: "direction_city", headerName: "direction", flex: 1 },
    {
      field: "date", headerName: "date", flex: 1, renderCell: (params: GridRenderCellParams) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {params.value}
          <Button variant="contained" size="small" style={{ marginLeft: 16 }} onClick={() => handleButtonClick(params.row.id)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      {loading || !shipments?.length ?  <div>loading...</div> : <DataGrid
        rows={shipments}
        columns={columns}
        className={styles.table}
        rowSelection={false}
        hideFooter={true}
      />}

    <div className={styles.pagination}>
      {previousPage ? <Button onClick={() => getShipments(previousPage)}> ← PREV</Button> : null}
      {nextPage ? <Button onClick={() => getShipments(nextPage)}>NEXT → </Button> : null}
    </div>

    </div>
  );
};
