import { Typography, InputAdornment, IconButton } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Gap from "../../Component/gap";
import Input from "../../Component/input";
import Button from "../../Component/button";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { login } from "../../Config/Redux/action";
import { alertSuccess, alertError } from "../../Component/alert/sweetalert";
import ModalAddUser from "../../Component/modal/Modal-AddUser-Component";
import axios from "axios";

function Login(props) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [modal, setModal] = React.useState();
  const history = useHistory();
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const submitUser = async (
    firstName,
    lastName,
    password,
    phoneNumber,
    userName,
    email
  ) => {
    try {
      const url = "http://localhost:8282/api/auth/login";
      const headers = defaultHeaders;
      const response = await axios({
        method: "POST",
        url,
        data: {
          userName: "quadrant_tester",
          password: "112233",
        },
        headers,
      });
      if (response?.status) {
        setModal(false);
        const url = "http://localhost:8282/api/auth/signup";
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("password", password);
        formData.append("phoneNumber", phoneNumber);
        formData.append("userName", userName);
        formData.append("email", email);
        let res = await axios({
          method: "POST",
          url,
          data: formData,
          headers: {
            Authorization: "Bearer " + response.data.token,
          },
        });
        if (res?.status) {
          alertSuccess("Success", "");
        } else {
          alertError("Error", "Fail add data");
        }
      }
      return response;
    } catch (error) {
      if (error.response.status === 401) {
        //clearStoredCreds();
        // logoutEvent();
      }
      return Promise.reject(error.response);
    }
  };
  const handleOpenModal = () => {
    setModal(true);
  };

  const loginForm = (
    <Formik
      initialValues={{}}
      enableReinitialize={true}
      validate={(values) => {
        const errors = {};
        if (!values.userName) {
          errors.userName = "Fill the Username";
        }
        if (!values.password) {
          errors.password = "Fill the Password";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const user = {
          userName: values.userName,
          password: values.password,
        };
        const resp = await dispatch(login(user));

        if (resp.type === "LOGIN_SUCCESS") {
          alertSuccess("Success", "Login Successfull!");
          history.push("/home");
          window.location.reload();
        } else {
          if (resp?.payload?.status === 401) {
            await alertError("Fail", "Username or Password maybe wrong!");
            return;
          } else {
            await alertError("Fail", "Internal server error");
            return;
          }
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        dirty,
      }) => (
        <div
          style={{
            width: "100%",
            margin: "0",
            zIndex: 9999,
          }}
          align="center"
        >
          <img
            alt="logo"
            src={logo}
            style={{ width: "35%", marginTop: "5%" }}
          />
          <Gap height="40px" />
          <div
            style={{
              width: "400px",
              height: "350px",
              background: "#FFF",
              zIndex: 9999,
            }}
          >
            <Gap height="20px" />
            <Typography
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#717171",
              }}
            >
              LOGIN
            </Typography>
            <Gap height="15px" />
            <div
              align="left"
              style={{
                margin: "25px",
              }}
            >
              <Typography
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#717171",
                }}
              >
                Username
              </Typography>
              <Gap height="10px" />
              <Input
                value={values.userName}
                onChange={handleChange("userName")}
                style={{
                  width: "100%",
                  borderRadius: "3px",
                  height: "100%",
                }}
              />
              <Typography
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#717171",
                }}
              >
                Password
              </Typography>
              <Gap height="10px" />
              <Input
                value={values.password}
                onChange={handleChange("password")}
                style={{
                  width: "100%",
                  borderRadius: "3px",
                }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Gap height="10px" />
              <div
                style={{
                  display: "flex",
                  position: "relative",
                }}
              >
                <Gap height="10px" />
                <span
                  style={{
                    position: "absolute",
                    right: "0",
                    marginTop: "10px",
                  }}
                >
                  <Link
                    onClick={handleOpenModal}
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    Create Account?
                  </Link>
                </span>
              </div>
              <Gap height="10px" />
              <Button
                onClick={handleSubmit}
                label="Login"
                style={{
                  width: "100%",
                  marginTop: "5%",
                  background: "rgb(81 94 193)",
                  color: "white",
                  fontSize: "15px",
                  textTransform: "capitalize",
                }}
              />
            </div>
          </div>
          <ModalAddUser
            open={modal}
            submit={(
              firstName,
              lastName,
              password,
              phoneNumber,
              userName,
              email
            ) =>
              submitUser(
                firstName,
                lastName,
                password,
                phoneNumber,
                userName,
                email
              )
            }
            onClickOpen={() => setModal(!modal)}
          />
        </div>
      )}
    </Formik>
  );
  return (
    <div className="background-login">
      {/* {loginForm} */}
      <div className="overlay-img"></div>

      <div className="login-form">{loginForm}</div>
    </div>
  );
}

export default Login;
