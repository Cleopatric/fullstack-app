import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Table } from "./components/Table/Table";
import { CommonModal, MODAL_TYPE } from "./components/Modal/Modal";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<string>(MODAL_TYPE.ADD);
  const [instanceId, setInstanceId] = useState<string>('');

  const handleOpen = (type: string, shipmentId?: string) => {
    shipmentId && setInstanceId(shipmentId);
    setModalType(type);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CommonModal
        open={openModal}
        instanceId={instanceId}
        handleClose={handleClose}
        type={modalType}
      />
      <Header handleOpen={handleOpen} />
      <Table handleOpenModal={handleOpen} />
    </div>
  );
}

export default App;
