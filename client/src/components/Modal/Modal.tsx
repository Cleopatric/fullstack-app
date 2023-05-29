import React from "react";
import { Modal, Box } from "@mui/material";

import styles from "./styles.module.sass";
import { Form } from "../Form/Form";

export const MODAL_TYPE = {
  ADD: 'ADD',
  EDIT: "EDIT",
}

interface IModal {
  open: boolean;
  instanceId?: string;
  handleClose: () => void;
  type: string;
}

export const CommonModal = (props: IModal) => {
  const { open, type, handleClose, instanceId } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.wrapper}>
        <Form type={type} instanceId={instanceId} handleClose={handleClose} />
      </Box>
    </Modal>
  );
};
