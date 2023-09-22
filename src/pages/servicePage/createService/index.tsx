import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContext } from "../../../context/ToastContext";
import { postService } from "../../../api";
import { useAuth } from "../../../hooks/useAuth";

import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import FileUpload from "../../../components/uploadFile";
import NavBar from "../../../components/navBar";

const CreateService = () => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
 const [imageUrl, setImageUrl] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (name: string, description: string, file: string) => {
    postService(name, description, file)
      .then((res) => {
        setToastMessage(" سرویس جدید با موفقیت ساخته شد");
        setMessageType("success");
        setTimeout(() => {
          navigate("/service");
        }, 2000);
      })
      .catch((error) => {
        setToastMessage(
          "ثبت سرویس جدید با مشکل مواجه شد. لطفا تمام فیلد هارو وارد کنید"
        );
        setMessageType("error");
      });
  };

  return (
    <NavBar>
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "500px", height: "200px", objectFit: "cover" }}
          src="http://cs5.thorhammer.space/291372e5694826d105bf9750908bde8de.svg"
        />

        <Typography component="h1" variant="h5" fontFamily="Vazir">
          ثبت سرویس جدید
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(name, description, imageUrl);
          }}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                required
                id="name"
                label="نام سرویس"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" variant="body1">
                توضیحات
              </Typography>
              <TextareaAutosize
                required
                id="description"
                style={{
                  width: "100%",
                  backgroundColor: "#121212",
                  color: "white",
                }}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
                minRows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <FileUpload imageUrl={imageUrl} setImageUrl={setImageUrl} altName="service image"/>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "50%", fontSize: "20px" }}
          >
            ثبت سرویس
          </Button>
        </Box>
      </Box>
    </Box>
    </NavBar>
  );
};

export default CreateService;
