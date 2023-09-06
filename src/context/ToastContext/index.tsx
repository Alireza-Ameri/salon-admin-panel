import React, { createContext, ReactNode, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Props = {
  children?: ReactNode;
};

interface IToastContext {
  toastMessage: string;
  setToastMessage: (newState: string) => void;
  messageType: "error" | "warning" | "info" | "success" | string;
  setMessageType: (newState: "error" | "warning" | "info" | "success") => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialValue = {
  toastMessage: "",
  setToastMessage: () => {},
  messageType: "error",
  setMessageType: () => {},
};

const ToastContext = createContext<IToastContext>(initialValue);

const ToastProvider = ({ children }: Props) => {
  const [toastMessage, setToastMessage] = useState<string>(
    initialValue.toastMessage
  );
  const [messageType, setMessageType] = useState<
    "error" | "warning" | "info" | "success"
  >("error");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToastMessage("");
  };

  useEffect(() => {
    if (toastMessage) {
      setTimeout(() => {
        setToastMessage("");
      }, 10000);
    }
  }, [toastMessage]);

  return (
    <ToastContext.Provider
      value={{ toastMessage, setToastMessage, messageType, setMessageType }}
    >
      {children}
      {toastMessage ? (
        <>
          <Snackbar open={true} autoHideDuration={10000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={messageType}
              sx={{ width: "100%" }}
            >
              {toastMessage}
            </Alert>
          </Snackbar>
        </>
      ) : null}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
