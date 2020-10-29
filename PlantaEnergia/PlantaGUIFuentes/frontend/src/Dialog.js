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
  const [matrix, setMatrix] = useState([[0]]);

  // eslint-disable-next-line
  useEffect(() => {
    setOpen(props.open);
    setMatrix(props.matrix);
  });

  const onChange = (event, key, matrix) => {
    let [day, client] = key.split("-").map((index) => parseInt(index));
    let copy = matrix;
    copy[day][client] = parseInt(event.target.value)
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
        {matrix.map((arrItem, i) => {
          return (
            <tr key={i}>
              {arrItem.map((item, j) => {
                return (
                  <td key={j}>
                    <TextField
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder={`${item}`}
                      label={`Dia ${i + 1}, Cliente ${j + 1}`}
                      onChange={(event) => {
                        onChange(event, i + "-" + j, matrix);
                      }}
                      style={{
                        maxWidth: 120,
                        minWidth: 120,
                        maxHeight: 60,
                        minHeight: 60,
                        padding: 5,
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
