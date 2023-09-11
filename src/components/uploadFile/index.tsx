import React, { useState } from "react";
import Button from "@mui/material/Button";
import { postUpload } from "../../api";

const FileUpload = () => {
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // const handleUpload = () => {
  //   if (file) {
  //     console.log("Uploading file...");
  //     console.log("file", file);
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     console.log("formData", formData.get("file"));
  //     postUpload(formData.get("file"))
  //       .then((res) => console.log("res", res))
  //       .catch((error) => console.log("error", error));
  //   }
  // };

  const upload = (e: React.FormEvent<HTMLInputElement>) => {
    let formData: FormData = new FormData();
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    console.log("target :", target.files[0]);
    setFile(target.files[0]);
    formData.append("file", target.files[0]);

    console.log({ formData });

    postUpload(formData)
      .then((res) => console.log("res", res))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          upload(e);
        }}
      />

      {/* <Button
        variant="contained"
        component="label"
        onClick={() => {
          // handleUpload();
        }}
      >
        Upload
      </Button> */}
    </div>
  );
};

export default FileUpload;
