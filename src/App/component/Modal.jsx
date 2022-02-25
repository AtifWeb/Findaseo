import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Modal as M, Backdrop, Fade } from "@material-ui/core";
import NeutralButton from "./NeutralButton";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

    maxHeight: "100%",
  },
}));
const Modal = ({ children, open, setOpen, close = false }) => {
  const classes = useStyles();
  return (
    <M
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={close ? null : () => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {close ? (
            <div className="mb-4 position-relative">
              <NeutralButton
                onClick={() => setOpen(false)}
                className="position-absolute w-auto end-0"
              >
                &times;
              </NeutralButton>
            </div>
          ) : null}

          <div style={{ overflow: "scroll", maxHeight: "90vh" }}>
            {children}
          </div>
        </div>
      </Fade>
    </M>
  );
};

export default Modal;
