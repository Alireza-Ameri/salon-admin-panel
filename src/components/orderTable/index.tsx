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
import { IUser } from "../../types/user";
import { getUsers } from "../../api";
import { ToastContext } from "../../context/ToastContext";

interface IProps {}

const OrderTable: FC<IProps> = ({}) => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  const [users, setUsers] = useState<IUser[]>([]);
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
    getUsers(newpage * limit, limit, search)
      .then((res) => {
        setUsers(res.data.users);
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

    getUsers(0 * event.target.value, event.target.value, search)
      .then((res) => {
        setUsers(res.data.users);
        setCount(res.data.count);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
        setMessageType("error");
      });
  }

  useEffect(() => {
    getUsers(pg * limit, limit, search)
      .then((res) => {
        setUsers(res.data.users);
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
                <TableCell>ID</TableCell>
                <TableCell>نام کاربری مشتری</TableCell>
                <TableCell>نام و نام خانوادگی</TableCell>
                <TableCell>شماره تماس</TableCell>
                <TableCell>ایمیل</TableCell>
                <TableCell>تاریخ</TableCell>
                <TableCell>نوع سرویس</TableCell>
                <TableCell>نام سالن</TableCell>
                <TableCell>شماره تماس سالن</TableCell>
                <TableCell>قیمت</TableCell>
                {/* <TableCell>
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
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>alireza</TableCell>
                <TableCell>علیرضا عامری</TableCell>
                <TableCell>09123456789 </TableCell>
                <TableCell>alireza@yahoo.com</TableCell>
                <TableCell>1402/7/1</TableCell>
                <TableCell>کوتاه کردن مو</TableCell>
                <TableCell>ارایشگاه پرویز </TableCell>
                <TableCell>02120304050</TableCell>
                <TableCell>۲۰۰۰۰ تومان</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>hosein</TableCell>
                <TableCell> حسین امیری</TableCell>
                <TableCell> 09123456789</TableCell>
                <TableCell>hosein@yahoo.com</TableCell>
                <TableCell>1402/7/1</TableCell>
                <TableCell>کوتاه کردن مو</TableCell>
                <TableCell>ارایشگاه پرویز </TableCell>
                <TableCell>02120304050</TableCell>
                <TableCell>۲۰۰۰۰ تومان</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>amir</TableCell>
                <TableCell>امیر محمد کارگر</TableCell>
                <TableCell>09123456789 </TableCell>
                <TableCell>amir@yahoo.com</TableCell>
                <TableCell>1402/7/1</TableCell>
                <TableCell>کوتاه کردن مو</TableCell>
                <TableCell>ارایشگاه پرویز </TableCell>
                <TableCell>02120304050</TableCell>
                <TableCell>۲۰۰۰۰ تومان</TableCell>
              </TableRow>
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
