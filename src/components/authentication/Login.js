import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, Router } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GlobalGymInfo } from "../../context";
import Dashboard from "../dashbaord";
import sleep from "../../utils/timer/timer";
import './Login.css'
// import { ToastContainer, toast } from "react-toastify";

// import SwipeableTemporaryDrawer from "../sideBar/sidebar";
import { LoginLoader } from "../loader/loader";
import { ToastMessage } from "../../utils/toastMessage/toast";
import { base_url } from "../../Api/services";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const user_input = {
  position: "relative",
  width: "80%",
  borderRight: "none",
  borderInline: "1px blue",
};

export const loaderImp = () => {
  setTimeout(() => {
    <LoginLoader />;
  }, 1000);
};
const Login = () => {
  const { Auth } = useContext(GlobalGymInfo);

  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
  });
  const [loginLoader, setLoginLoader] = useState(false);

  const [useranme, setUseranme] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleUsernameChange = (event) => {
    setUseranme(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const axiosInstance = axios.create({
    baseURL: `${base_url}${"api"}`,
    timeout: 5000,
    headers: {
      Authorization: localStorage.getItem("token")
        ? "token " + localStorage.getItem("token")
        : null,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginLoader(true);
    // sleep(2000);

    axiosInstance
      .post(`login-user/`, {
        username: useranme,
        password: password,
      })
      .then(
        (res) => {
          if (res.status === 200 && res.data != "Incorrect Login credentials") {
            console.log(res, "check the data comming ");
            localStorage.setItem("token", res.data.token);
            axiosInstance.defaults.headers["Authorization"] =
              "token " + localStorage.getItem("token");

            let token_ = localStorage.getItem("token");
            Auth(token_);
            setTimeout(function () {
              history.push("/home");
            }, 2000);
            ToastMessage("success", "Successfully logged in");
          }
        },
        (error) => {
          if (
            error.response.status === 403 &&
            error.response.data === "Account not active"
          ) {
            ToastMessage(
              "error",
              "Account not active, Please contact Administrator"
            );
          } else if (
            error.response.status === 401 &&
            error.response.data === "Account is not verified"
          ) {
            ToastMessage(
              "error",
              "Account is not verified, Please contact Administrator"
            );
          } else if (
            error.response.status === 403 &&
            error.response.data === "User is not superuser"
          ) {
            ToastMessage(
              "error",
              "Only Admin can login, Please contact Administrator"
            );
          } else if (
            error.response.status === 400 &&
            error.response.data === "Incorrect Login credentials"
          ) {
            ToastMessage("error", "Please check you username and password");
          } else {
            ToastMessage("error", "Please check your connection");
          }

          setLoginLoader(false);
        }
      );
  };

  useEffect(() => {
    const signToken = localStorage.getItem("token");
    if (!signToken) {
    } else {
      history.push("/home");
    }
  }, []);

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ backgroundColor: "white" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              style={{ width: "100%" }}
              variant="outlined"
            >
              <OutlinedInput
                id="username"
                value={useranme}
                placeholder="example@example.com"
                name="username"
                type="text"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "white",

                }}
                onChange={handleUsernameChange}
              />
            </FormControl>
            <div style={{ paddingTop: "70px" }}></div>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              style={{ width: "100%" }}
              variant="outlined"
            >
              <OutlinedInput
                id="password"
                value={password}
                placeholder="Password"
                name="password"
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "none",
                  borderStyle: "none",
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                onChange={handlePasswordChange}
              />
            </FormControl>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={!useranme || !password || loginLoader}
          >
            Log In <span>&nbsp;&nbsp;</span>
            {loginLoader ? (
              <>
                <LoginLoader />
              </>
            ) : (
              <></>
            )}
          </Button>

          <Grid container>
            <Grid item xs>
              {/* <Link to={FORGETPASSWORD_EMAIL_PATH} variant="body2"> */}
              Forgot password?
              {/* </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <div style={{ paddingTop: "10px" }}></div>
    </Container>
  );
};

export default Login;
