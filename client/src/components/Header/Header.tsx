import React from "react";
import { Box, Typography } from "@mui/material";
import CommonButton from "../Button";
import { MODAL_TYPE } from "../Modal/Modal";

import styles from "./styles.module.sass";

import truckImage from "../../assets/truckImage.png";

interface IHeader {
  handleOpen: (type: string) => void;
}

export const Header = (props: IHeader) => {
  const { handleOpen } = props;

  const handleButtonClick = () => {
    handleOpen(MODAL_TYPE.ADD);
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.leftSide}>
        <img src={truckImage} alt="truck" />
        <Typography variant="h5">SHIPMENTS SERVICE</Typography>
      </Box>
      <Box>
        <CommonButton handleOpen={handleButtonClick} />
      </Box>
    </Box>
  );
};
