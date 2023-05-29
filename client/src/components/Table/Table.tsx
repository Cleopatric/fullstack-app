import axios from "axios";
import React from "react";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import styles from "./styles.module.sass";
import { Button } from "@mui/material";
import { useAxiosRequest } from "../../hooks/useAxiosRequest";


interface ITable {
  handleOpenModal: (type: "add" | "edit", instanceId?: string) => void;
}

export const Table = (props: ITable) => {
  const { handleOpenModal } = props;
  const { loading, response, error } = useAxiosRequest('http://127.0.0.1:8000/shipments/all-shipments', {}, true);


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
      {loading || !response?.length ?  <div>loading...</div> : <DataGrid
        rows={response}
        columns={columns}
        className={styles.table}
        rowSelection={false}
      />}

    </div>
  );
};
