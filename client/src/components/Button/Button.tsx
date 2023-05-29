import React from "react";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface ICommonButton {
  handleOpen: () => void;
}

export const CommonButton = (props: ICommonButton) => {
  const { handleOpen } = props;

  return (
    <Button variant="outlined" onClick={handleOpen}>
      Add Shipment
      <AddIcon />
    </Button>
  );
};
