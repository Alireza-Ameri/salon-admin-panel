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
} from "@mui/material";
import { SearchOutlined, CloseOutlined } from "@mui/icons-material";
import { IOrder } from "../../types/service";
import { getAllOrders } from "../../api";
import { ToastContext } from "../../context/ToastContext";

interface IProps {}

const OrderTable: FC<IProps> = ({}) => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  const [orders, setOrders] = useState<IOrder[]>([]);
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
    getAllOrders(newpage * limit, limit, search)
      .then((res) => {
        setOrders(res.data.orders);
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

    getAllOrders(0 * event.target.value, event.target.value, search)
      .then((res) => {
        setOrders(res.data.orders);
        setCount(res.data.count);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
        setMessageType("error");
      });
  }

  useEffect(() => {
    getAllOrders(pg * limit, limit, search)
      .then((res) => {
        setOrders(res.data.orders);
        setCount(res.data.count);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
        setMessageType("error");
      });
  }, [search]);

  return (
    <Box style={{ width: "80%", marginBottom: "30px" }}>
      <CssBaseline />
      <Paper style={{ width: "100%", padding: "10px" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>اطلاعات سفارشات</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>نام کاربری مشتری</TableCell>
                <TableCell>نام و نام خانوادگی</TableCell>
                <TableCell>ایمیل</TableCell>
                <TableCell>تاریخ</TableCell>
                <TableCell>نوع سرویس</TableCell>
                <TableCell>نام سالن</TableCell>
                <TableCell>شماره تماس سالن</TableCell>
                <TableCell>قیمت</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: IOrder) => {
                return (
                  <TableRow>
                    <TableCell>{order.user.username}</TableCell>
                    <TableCell>
                      {order.user.firstName} {order.user.lastName}
                    </TableCell>
                    <TableCell>{order.user.email} </TableCell>
                    <TableCell>۱۴۰۲/۷/۱۰</TableCell>
                    <TableCell>کوتاه کردن مو</TableCell>
                    <TableCell>{order.salon.name}</TableCell>
                    <TableCell>{order.salon.phone}</TableCell>
                    <TableCell>
                      {order.price} تومان
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

export default OrderTable;
