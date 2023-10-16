import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";

import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { IService } from "../../types/service";
import { getService } from "../../api";
import { ToastContext } from "../../context/ToastContext";

interface IProps {}

const ServiceTable: FC<IProps> = ({}) => {
  const navigate = useNavigate();
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    getService()
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات سرویس ها با مشکل روبرو شد");
        setMessageType("error");
      });
  }, []);

  return (
    <Box style={{ width: "80%", marginBottom: "30px" }}>
      <CssBaseline />
      <Paper style={{ width: "100%", padding: "10px" }}>
        <Box style={{ width: "90%", display: "flex" }}>
          <Button
            onClick={() => {
              navigate("/create-service");
            }}
            sx={{ width: "15%" }}
          >
            ثبت سرویس جدید
          </Button>
          <h2 style={{ textAlign: "center", color: "white", width: "100%" }}>
            انواع سرویس{" "}
          </h2>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>عکس</TableCell>
                <TableCell>نام سرویس</TableCell>
                <TableCell> توضیحات</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service: IService) => {
                return (
                  <TableRow key={service.id}>
                    <TableCell>
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        src={service.image}
                        alt={service.name}
                      />
                    </TableCell>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Button>
                        <DeleteOutline />
                      </Button>
                      <Button>
                        <EditOutlined />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ServiceTable;
