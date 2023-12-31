import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContext } from "../../../context/ToastContext";
import { patchService, getServiceById } from "../../../api";
import { useAuth } from "../../../hooks/useAuth";
import { useParams } from "react-router";

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

const EditService = () => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getServiceById(`${id}`)
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setImageUrl(res.data.image);
      })
      .catch((error) => {
        setToastMessage("دریافت اطلاعات سرویس با مشکل مواجه شد");
        setMessageType("error");
      });
  }, []);

  const handleSubmit = (name: string, description: string, file: string) => {
    patchService(`${id}`, name, description, file)
      .then((res) => {
        setToastMessage(" تغییر سرویس با موفقیت انجام شد ");
        setMessageType("success");
        setTimeout(() => {
          navigate("/service");
        }, 2000);
      })
      .catch((error) => {
        setToastMessage(
          "تغییر سرویس  با مشکل مواجه شد. لطفا تمام فیلد هارو وارد کنید"
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
            تغییر سرویس
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
                <FileUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  altName="service image"
                />
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

export default EditService;
