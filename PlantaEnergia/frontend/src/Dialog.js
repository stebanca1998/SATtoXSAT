import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarMesssages from "./Snackbar";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  },[props.open]);

  const onChange = (event, key, matrix) => {
    let [client, day] = key.split("-").map((index) => parseInt(index));
    console.log("client: ", client, "day: ", day);

    let copy = matrix;
    copy[client][day] = parseInt(event.target.value)
      ? parseInt(event.target.value)
      : 0;
    props.setMatrix(copy);
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const Matrix = (
    <Table responsive="true">
      <tbody>
        {props.matrix.map((arrItem, i) => {
          return (
            <tr key={i}>
              {arrItem.map((item, j) => {
                return (
                  <td key={j}>
                    <TextField
                      variant="outlined"
                      placeholder={`${item}`}
                      onChange={(event) =>
                        onChange(event, i + "-" + j, props.matrix)
                      }
                      style={{
                        maxWidth: "60px",
                        minWidth: "60px",
                        maxHeight: "60px",
                        minHeight: "60px",
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <div style={{ alignContent: "center", alignItems: "center" }}>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        {" "}
        {console.log(props.matrix)}
        <DialogTitle id="customized-dialog-title">
          Demanda diaria de energía (Megawatts)
        </DialogTitle>
        <DialogContent dividers>{Matrix}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpen(false);
              setOpenSnackbar(true);
            }}
            color="primary"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
        open={openSnackbar}
        autoHideDuration={3000}
      >
        <SnackbarMesssages
          variant="success"
          onClose={handleClose}
          message="Valores añadidos exitosamente"
        />
      </Snackbar>
    </div>
  );
}
