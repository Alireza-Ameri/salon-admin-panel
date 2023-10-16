import React, { FC, useContext, useEffect, useState } from "react";

import {
  Box,
  CssBaseline,
  TextField,
  Typography,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
} from "@mui/material";
import {
  SearchOutlined,
  CloseOutlined,
  PlaceOutlined,
} from "@mui/icons-material";
import { ISalon } from "../../types/service";
import { getProfile, getSalon ,postSalonVerify } from "../../api";
import { ToastContext } from "../../context/ToastContext";

interface IProps {}

const SalonTable: FC<IProps> = ({}) => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  const [salons, setSalons] = useState<ISalon[]>([]);
  const [count, setCount] = useState<number>(0);
  const [pg, setpg] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string>("");

  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearch(event.target.value);
  };
  const handleClick = (): void => {
    setSearch("");
    setShowClearIcon("none");
  };

  function handleChangePage(event: any, newpage: any) {
    setpg(newpage);
    getSalon(newpage * limit, limit, search)
      .then((res) => {
        setSalons(res.data.salons);
        setCount(res.data.count);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
        setMessageType("error");
      });
  }

  function handleChangeRowsPerPage(event: any) {
    setLimit(parseInt(event.target.value, 10));
    setpg(0);

    getSalon(0 * event.target.value, event.target.value, search)
      .then((res) => {
        setSalons(res.data.salons);
        setCount(res.data.count);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
        setMessageType("error");
      });
  }

  useEffect(() => {
    getSalon(pg * limit, limit, search)
      .then((res) => {
        setSalons(res.data.salons);
        setCount(res.data.count);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
        setMessageType("error");
      });
  }, [search]);

  useEffect(() => {
    getSalon()
      .then((res) => console.log({ res }))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box style={{ width: "80%", marginBottom: "30px" }}>
      <CssBaseline />
      <Paper style={{ width: "100%", padding: "10px" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>اطلاعات سالن ها</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>نام سالن</TableCell>
                <TableCell>شماره تماس</TableCell>
                <TableCell>توضیحات</TableCell>
                <TableCell>سرویس ها</TableCell>
                <TableCell>آدرس</TableCell>
                <TableCell>موقعیت مکانی</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>
                  <TextField
                    style={{ width: "80%" }}
                    size="small"
                    variant="outlined"
                    value={search}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ display: showClearIcon, cursor: "pointer" }}
                          onClick={handleClick}
                        >
                          <CloseOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salons.map((salon: ISalon) => {
                return (
                  <TableRow key={salon.id}>
                    <TableCell>{salon.name}</TableCell>
                    <TableCell>{salon.phone}</TableCell>
                    <TableCell>{salon.description}</TableCell>
                    <TableCell>
                      {salon.services.map((service) => service.name).join(",")}
                    </TableCell>
                    <TableCell>{salon.address}</TableCell>
                    <TableCell>
                      <a
                        href={`https://www.google.com/maps/dir/${
                          salon.map.split(",")[0]
                        },${salon.map.split(",")[1]}/${
                          salon.map.split(",")[0]
                        },${salon.map.split(",")[1]}/@${
                          salon.map.split(",")[0]
                        },${salon.map.split(",")[1]},12z?entry=ttu`}
                        target="_blank"
                        style={{ color: "white" }}
                      >
                        <PlaceOutlined />
                      </a>
                    </TableCell>
                    <TableCell
                      style={{ color: salon.verified ? "#0dff4d" : "red" }}
                    >
                      {salon.verified ? "تایید" : "مسدود"}
                    </TableCell>
                    <TableCell>
                      <Button style={{ color: "red" }} onClick={() => {
                        postSalonVerify(false,`${salon.id}`)
                      }}>مسدود</Button>
                      <Button style={{ color: "#0dff4d" }} onClick={() => {
                        postSalonVerify(true,`${salon.id}`)
                      }}>تایید</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={limit}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default SalonTable;
