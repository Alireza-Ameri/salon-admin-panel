import { useState, useEffect, FC, useContext } from "react";
import { Button, Box } from "@mui/material";

import { postUpload } from "../../api";
import { ToastContext } from "../../context/ToastContext";

interface IProps {
  imageUrl: string;
  setImageUrl: (value: string) => void;
  altName?: string;
}

const FileUpload: FC<IProps> = ({ imageUrl, setImageUrl, altName }) => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  const upload = (e: React.FormEvent<HTMLInputElement>) => {
    let formData: FormData = new FormData();
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    formData.append("files", target.files[0]);

    postUpload(formData)
      .then((res) => {
        setImageUrl(
          `${process.env.REACT_APP_API_BASE_URL}/${res.data[0].filename}`
        );
      })
      .catch((error) => {
        setToastMessage("اپلود عکس با مشکل مواجه شد");
        setMessageType("error");
      });
  };

  return (
    <>
      <input
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={upload}
      />
      <div style={{ display: "flex" }}>
        <label htmlFor="select-image">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
        {imageUrl && (
          <Box>
            <img
              src={imageUrl}
              alt={altName}
              height="100px"
              style={{ marginRight: "20px" }}
            />
          </Box>
        )}
      </div>
    </>
  );
};

export default FileUpload;
