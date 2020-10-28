import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import IconAdd from "@material-ui/icons/NoteAddSharp";
import Dialog from "./Dialog.js";
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  littleButtons: {
    maxWidth: "30px",
    minWidth: "30px",
    maxHeight: "40px",
    minHeight: "40px",
    marginTop: "7px",
  },
  textFields: {
    maxWidth: "110px",
    minWidth: "110px",
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [days, setDays] = useState(1); // Dias
  const [clients, setClients] = useState(1); // Clientes
  
  const [pn, setPn] = useState(0); //
  const [ph, setPh] = useState(0); //  Produccion diaria
  const [pt, setPt] = useState(0); //

  const [cn, setCn] = useState(0); //
  const [ch, setCh] = useState(0); //  Costo de produccion
  const [ct, setCt] = useState(0); //

  var initMatrix = [];

  useEffect(() => {
    for (var i = 0; i < clients; i++) {
      initMatrix[i] = [];
      for (var j = 0; j < days; j++) {
        initMatrix[i][j] = 0;
      }
    }
    setMatrix(initMatrix);
  }, []);

  const [matrix, setMatrix] = useState(initMatrix); // Demanda diaria clientes/dias

  function onClick() {
    let data = { days, clients, pn, ph, pt, cn, ch, ct, matrix };
    axios
      .post("http://127.0.0.1:5000/", data, {
        headers: {
          "Content-Type": "text/plain",
          Accept: "application/json",
        },
      })
      .then((res) => {
        let response = JSON.stringify(Object.values(res)[0]);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  function incDecDays(event, day) {
    if (event.target.innerText === "+") {
      setDays(day + 1);
    } else {
      if (day - 1 >= 1) {
        setDays(day - 1);
      }
    }
  }

  function incDecClients(event, client) {
    if (event.target.innerText === "+") {
      setClients(client + 1);
    } else {
      if (client - 1 >= 1) {
        setClients(client - 1);
      }
    }
  }

  function incDecPn(event, pn) {
    if (event.target.innerText === "+") {
      setPn(pn + 1);
    } else {
      if (pn - 1 >= 1) {
        setPn(pn - 1);
      }
    }
  }

  function incDecPh(event, ph) {
    if (event.target.innerText === "+") {
      setPh(ph + 1);
    } else {
      if (ph - 1 >= 1) {
        setPh(ph - 1);
      }
    }
  }

  function incDecPt(event, pt) {
    if (event.target.innerText === "+") {
      setPt(pt + 1);
    } else {
      if (pt - 1 >= 1) {
        setPt(pt - 1);
      }
    }
  }

  function incDecCn(event, cn) {
    if (event.target.innerText === "+") {
      setCn(cn + 1);
    } else {
      if (cn - 1 >= 1) {
        setCn(cn - 1);
      }
    }
  }

  function incDecCh(event, ch) {
    if (event.target.innerText === "+") {
      setCh(ch + 1);
    } else {
      if (ch - 1 >= 1) {
        setCh(ch - 1);
      }
    }
  }

  function incDecCt(event, ct) {
    if (event.target.innerText === "+") {
      setCt(ct + 1);
    } else {
      if (ct - 1 >= 1) {
        setCt(ct - 1);
      }
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Planificación de producción de energı́a
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs="auto" md={3} />
        {/* Dias ---------------------------------------------------------------- */}
        <Grid item xs="auto" md={2} style={{ paddingTop: 30 }}>
          <form>
            <Typography variant="h6" gutterBottom>
              Cantidad de días
            </Typography>
            <Button
              className={classes.littleButtons}
              color="primary"
              variant="contained"
              onClick={(event) => incDecDays(event, days)}
            >
              <b>–</b>
            </Button>
            &nbsp;
            <TextField
              className={classes.textFields}
              margin="dense"
              id="outlined-basic"
              label="Días (n)"
              variant="outlined"
              value={days}
              onChange={(event) =>
                setDays(
                  parseInt(event.target.value)
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecDays(event, days)}
              className={classes.littleButtons}
            >
              <b>+</b>
            </Button>
          </form>
          &nbsp;
        </Grid>
        {/* --------------------------------------------------------------------- */}

        {/* Clientes ------------------------------------------------------------ */}
        <Grid item xs="auto" md={2} style={{ paddingTop: 30 }}>
          <form>
            <Typography variant="h6" gutterBottom>
              Número de clientes
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecClients(event, clients)}
              className={classes.littleButtons}
            >
              <b>–</b>
            </Button>
            &nbsp;
            <TextField
              className={classes.textFields}
              margin="dense"
              id="outlined-basic"
              label="Clientes (s)"
              variant="outlined"
              value={clients}
              onChange={(event) =>
                setClients(
                  parseInt(event.target.value)
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecClients(event, clients)}
              className={classes.littleButtons}
            >
              <b>+</b>
            </Button>
          </form>
          &nbsp;&nbsp;
        </Grid>
        {/* --------------------------------------------------------------------- */}
        <Grid
          item
          xs="auto"
          md={2}
          style={{ paddingTop: 2, paddingLeft: "5px" }}
        >
          {" "}
          &nbsp;
          <Typography variant="h6" style={{ paddingBottom: 5 }}>
            Demanda de energı́a
          </Typography>
          <IconAdd
            color="primary"
            style={{ fontSize: 58, paddingLeft: "55px" }}
            onClick={() => setOpen(true)}
          />
        </Grid>
        <Dialog
          open={open}
          setOpen={setOpen}
          matrix={matrix}
          setMatrix={setMatrix}
        />

        <Grid item xs="auto" md={3} />
      </Grid>

      {/* ############################################################################################# */}

      {/* divider ------------------------------------------------------------- */}
      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6} style={{ paddingTop: 10, paddingBottom: 0 }}>
          <Divider variant="fullWidth" />
          <Typography
            variant="h6"
            gutterBottom
            style={{ paddingTop: 10, paddingBottom: 0 }}
          >
            Capacidad de producción diaria
          </Typography>
        </Grid>
      </Grid>
      {/* divider ------------------------------------------------------------- */}

      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs="auto" md={3} />
        {/* Central nuclear (N) ------------------------------------------------- */}
        <Grid item xs="auto" md={2}>
          <form>
            <Typography variant="subtitle1" gutterBottom>
              &nbsp;Central Nuclear (N)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecDays(event, days)}
              className={classes.littleButtons}
            >
              <b>–</b>
            </Button>
            &nbsp;
            <TextField
              className={classes.textFields}
              margin="dense"
              id="outlined-basic"
              label="(Pn)"
              variant="outlined"
              value={pn}
              onChange={(event) =>
                setPn(
                  parseInt(event.target.value)
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecPn(event, pn)}
              className={classes.littleButtons}
            >
              <b>+</b>
            </Button>
          </form>
          &nbsp;
        </Grid>
        {/* --------------------------------------------------------------------- */}

        {/* Central hidroeléctrica (H) ------------------------------------------ */}
        <Grid item xs="auto" md={2}>
          <form>
            <Typography variant="subtitle1" gutterBottom>
              Central Hidroeléctrica (H)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecPh(event, ph)}
              className={classes.littleButtons}
            >
              <b>–</b>
            </Button>
            &nbsp;
            <TextField
              className={classes.textFields}
              margin="dense"
              id="outlined-basic"
              label="(Ph)"
              variant="outlined"
              value={ph}
              onChange={(event) =>
                setPh(
                  parseInt(event.target.value)
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecPh(event, ph)}
              className={classes.littleButtons}
            >
              <b>+</b>
            </Button>
          </form>
          &nbsp;&nbsp;
        </Grid>
        {/* --------------------------------------------------------------------- */}

        {/* Central térmica (T) ------------------------------------------------- */}
        <Grid item xs="auto" md={2}>
          <form>
            <Typography variant="subtitle1" gutterBottom>
              &nbsp;Central Térmica (T)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecPt(event, pt)}
              className={classes.littleButtons}
            >
              <b>–</b>
            </Button>
            &nbsp;
            <TextField
              className={classes.textFields}
              margin="dense"
              id="outlined-basic"
              label="(Pt)"
              variant="outlined"
              value={pt}
              onChange={(event) =>
                setPt(
                  parseInt(event.target.value)
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecPt(event, pt)}
              className={classes.littleButtons}
            >
              <b>+</b>
            </Button>
          </form>
          &nbsp;
        </Grid>
        {/* --------------------------------------------------------------------- */}
        <Grid item xs="auto" md={3} />
      </Grid>

      {/* divider ------------------------------------------------------------- */}
      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6} style={{ paddingTop: 20, paddingBottom: 0 }}>
          <Divider variant="fullWidth" />
          <Typography
            variant="h6"
            gutterBottom
            style={{ paddingTop: 10, paddingBottom: 0 }}
          >
            Costos de producción
          </Typography>
        </Grid>
      </Grid>
      {/* divider ------------------------------------------------------------- */}

      {/* ############################################################################################# */}

      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs="auto" md={3} />
        {/* Central nuclear (N) ------------------------------------------------- */}
        <Grid item xs="auto" md={2}>
          <form>
            <Typography variant="subtitle1" gutterBottom>
              &nbsp;Central Nuclear (N)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecCn(event, cn)}
              className={classes.littleButtons}
            >
              <b>–</b>
            </Button>
            &nbsp;
            <TextField
              className={classes.textFields}
              margin="dense"
              id="outlined-basic"
              label="(Cn)"
              variant="outlined"
              value={cn}
              onChange={(event) =>
                setCn(
                  parseInt(event.target.value)
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecCn(event, cn)}
              className={classes.littleButtons}
            >
              <b>+</b>
            </Button>
          </form>
          &nbsp;
        </Grid>
        {/* --------------------------------------------------------------------- */}

        {/* Central hidroeléctrica (H) ------------------------------------------ */}
        <Grid item xs="auto" md={2}>
          <form>
            <Typography variant="subtitle1" gutterBottom>
              Central Hidroeléctrica (H)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecCh(event, ch)}
              className={classes.littleButtons}
            >
              <b>–</b>
            </Button>
            &nbsp;
            <TextField
              className={classes.textFields}
              margin="dense"
              id="outlined-basic"
              label="(Ch)"
              variant="outlined"
              value={ch}
              onChange={(event) =>
                setCh(
                  parseInt(event.target.value)
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecCh(event, ch)}
              className={classes.littleButtons}
            >
              <b>+</b>
            </Button>
          </form>
          &nbsp;&nbsp;
        </Grid>
        {/* --------------------------------------------------------------------- */}

        {/* Central térmica (T) ------------------------------------------------- */}
        <Grid item xs="auto" md={2}>
          <form>
            <Typography variant="subtitle1" gutterBottom>
              &nbsp;Central Térmica (T)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecCt(event, ct)}
              className={classes.littleButtons}
            >
              <b>–</b>
            </Button>
            &nbsp;
            <TextField
              className={classes.textFields}
              margin="dense"
              id="outlined-basic"
              label="(Ct)"
              variant="outlined"
              value={ct}
              onChange={(event) =>
                setCt(
                  parseInt(event.target.value)
                    ? parseInt(event.target.value)
                    : 1
                )
              }
            />
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => incDecCt(event, ct)}
              className={classes.littleButtons}
            >
              <b>+</b>
            </Button>
          </form>
          &nbsp;
        </Grid>
        {/* --------------------------------------------------------------------- */}
        <Grid item xs="auto" md={3} />
      </Grid>

      {/* ############################################################################################# */}

      {/* divider ------------------------------------------------------------- */}
      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6} style={{ paddingTop: 10, paddingBottom: 0 }}>
          <Divider variant="fullWidth" />
          <br />
          <Button variant="contained" color="primary" onClick={onClick}>
            Calcular
          </Button>
        </Grid>
      </Grid>
      {/* divider ------------------------------------------------------------- */}
    </div>
  );
}

export default App;
