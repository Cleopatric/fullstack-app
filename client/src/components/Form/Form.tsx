import axios from "axios";
import { useState, useEffect } from "react";

import { Box, Button, Select, Typography, Input } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';

import styles from "./styles.module.sass";
import { MODAL_TYPE } from "../Modal/Modal";
import { useAxiosRequest } from "../../hooks/useAxiosRequest";

type Inputs = {
  title: string;
  direction: string;
  date: string;
  comment?: string;
};

interface IForm {
  type: string;
  instanceId?: string;
  handleClose: () => void;
}

export const Form = (props: IForm) => {
  const baseUrl = 'http://127.0.0.1:8000/shipments';
  const citiesUrl = `${baseUrl}/cities`;
  const getShipmentUrl = `${baseUrl}/current-shipment/`;
  const addShipmentUrl = `${baseUrl}/create-shipment/`;
  const updateShipmentUrl = `${baseUrl}/update-shipment/`;
  const deleteShipmentUrl = `${baseUrl}/delete-shipment/`;

  const { type = MODAL_TYPE.ADD, instanceId, handleClose } = props;
  const { loading, response, error } = useAxiosRequest(citiesUrl);

  const [shipmentTitle, setShipmentTitle] = useState('');
  const [directionCity, setDirectionCity] = useState('');
  const [directionCityName, setDirectionCityName] = useState('');
  const [shipmentDate, setShipmentDate] = useState('');
  const [shipmentComment, setShipmentComment] = useState('');

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  useEffect(() => {
    if (type === 'edit') {
      axios.get(`${getShipmentUrl}${instanceId}/`).then((response) => {
        console.log(response.data);
        setShipmentTitle(response.data.title)
        setDirectionCity(`${response.data.direction}`)
        setDirectionCityName(`${response.data.direction_city}`)
        setShipmentDate(response.data.date)
        setShipmentComment(response.data.comment)
      });
    }
  }, []);


  const deleteShipment = () => {
    if (type === 'edit') {
      const resp = axios.delete(`${deleteShipmentUrl}${instanceId}/`);
    }
    handleClose();
    window.location.reload();
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {


    if (data.direction === 'defaultSelect') {
       data.direction = '';
    }
    const params = {
      title: data.title || shipmentTitle,
      direction: data.direction || directionCity,
      date: data.date || shipmentDate,
      comment: data.comment || shipmentComment
    }

    if (type === MODAL_TYPE.ADD) {
      console.log(data, 'add')
      const resp = axios.post(addShipmentUrl, params)
    } else {
      console.log(data, 'edit', instanceId)
      if (instanceId) {
          const resp = axios.put(`${updateShipmentUrl}${instanceId}/`, params);
          console.log(data, 'put', resp)
        }
    }
    handleClose();
    window.location.reload();
  }


  return (
    <Box>
      <Typography variant="h6" className={styles.header}>{type === MODAL_TYPE.ADD ? MODAL_TYPE.ADD : MODAL_TYPE.EDIT} Shipment</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Box className={styles.inputGroup}>
          <label className={styles.label}>Title*</label>
          <input
            className={styles.input}
            defaultValue={shipmentTitle}
            {...register("title")}
          />
        </Box>


        <Box className={styles.inputGroup}>
          <label className={styles.label}>Direction*</label>
          <Select
            className={styles.select}
            defaultValue="defaultSelect"
            {...register("direction")}>

          <MenuItem value="defaultSelect">{directionCityName}</MenuItem>

          {response.map((item) => {
            if (item.name !== directionCityName) {
              return <MenuItem value={item.id}>{item.name}</MenuItem>;
            }

          })}

          </Select>

        </Box>
        <Box className={styles.inputGroup}>
          <label className={styles.label}>Date*</label>
          <input
            className={styles.input}
            placeholder="YYYY-MM-DD"
            defaultValue={shipmentDate}
            {...register("date")}
          />

        </Box>

        <Box className={styles.inputGroup}>
          <label className={styles.label}>Comment</label>
          <textarea
            className={styles.input}
            defaultValue={shipmentComment}
            {...register("comment")}
          />
        </Box>

        <Box className={styles.buttonGroup}>
          <Button type="submit" variant="contained">{type === MODAL_TYPE.ADD ? 'Add' : 'Edit'}</Button>
          <Button onClick={deleteShipment} variant="outlined">{type === MODAL_TYPE.ADD ? 'Cancel' : 'Delete'}</Button>
        </Box>
      </form>
    </Box>
  );
};
