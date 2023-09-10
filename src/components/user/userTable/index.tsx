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
import { IUser } from "../../../types/user";
import { getProfile, getUsers } from "../../../api";
import { ToastContext } from "../../../context/ToastContext";

interface IProps {}

const UserTable: FC<IProps> = ({}) => {
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
        <h2 style={{ textAlign: "center", color: "white" }}>اطلاعات کاربران</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>نام کاربری</TableCell>
                <TableCell>نام و نام خانوادگی</TableCell>
                <TableCell>ایمیل</TableCell>
                <TableCell>نوع کاربر</TableCell>
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
              {users.map((user: IUser) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.isStoreOwner
                        ? "سالن دار"
                        : user.isAdmin
                        ? "ادمین"
                        : "کاربر"}
                    </TableCell>
                    <TableCell></TableCell>
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

export default UserTable;
