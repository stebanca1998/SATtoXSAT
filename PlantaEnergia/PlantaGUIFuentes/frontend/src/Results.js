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
import DialogContentText from "@material-ui/core/DialogContentText";

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

export default function Results(props) {
  const [open, setOpen] = useState(false);
  const [productionMatrix, setproductionMatrix] = useState([]);

  const central = (number) => {
    switch (number) {
      case 0:
        return "N";
      case 1:
        return "H";
      case 2:
        return "T";
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    setOpen(props.open);
  });

  // eslint-disable-next-line
  useEffect(() => {
    setOpen(props.open);
    let auxMatrix = [];

    if (props.results.content && props.results.satisfactible) {
      for (let i = 0; i < 3; i++) {
        auxMatrix[i] = [];
        for (let j = 0; j < props.days; j++) {
          let ctrl = central(i);
          auxMatrix[i][j] = props.results[ctrl][j];
        }
      }
    }
    setproductionMatrix(auxMatrix);
  }, [props.results]);

  const Matrix = (
    <Table responsive="true">
      <tbody>
        {productionMatrix.map((arrItem, i) => {
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
                      defaultValue={`${item}`}
                      label={`Central ${central(i)}, Dia ${j + 1}`}
                      style={{
                        maxWidth: 105,
                        minWidth: 105,
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
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="customized-dialog-title">
          Planificación de producción de energı́a
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {props.results.satisfactible
              ? `Planificación de la producción de energı́a en un horizonte de ${props.days} dı́as que satisface la demanda diaria ingresada. La "Función objetivo" fue ${props.results.Objective}`
              : "No es posible establecer una producción de energía con los valores ingresados."}
          </DialogContentText>
          <br />
          {Matrix}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpen(false);
            }}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
