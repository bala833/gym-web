import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import moment from "moment";
import { GetUserById, UserRegistration } from "../../Api/services";
import { useParams } from "react-router-dom";
import "./usercreation.css";
import { DateFilter } from "../../common/datefilter/validateDate";
import { ToastMessage } from "../../utils/toastMessage/toast";
import Loader from "../../common/loader/loader";
import BackButton from "../../utils/common/goBack/goBack";

const UserCreation = () => {
  const form_initial_value = {
    first_name: "",
    last_name: "",
    from_to: null,
    valid_to: null,
    active: false,
    username: "",
    phone: "",
    email: "",
    password: "",
    role_type: "",
    id: 0,
  };
  const [dataValue, setDataValue] = useState(form_initial_value);
  const [from_toerror, setFrom_toerror] = useState(false);
  const [valid_toerror, setValid_toerror] = useState(false);
  const [first_nameError, setFirstnameError] = useState(false);
  const [last_nameError, setLastnameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roletypeError, setRoletypeError] = useState(false);
  const [startMinDate, setFromDate] = useState(new Date());
  const [startvalidDate, setvalidDate] = useState(new Date());
  const [validfromError, setValidfromError] = useState(true);
  const [loader, setLoader] = useState(true);
  let history = useHistory();
  const { id: userid } = useParams();

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "first_name") {
      if (!value) {
        setFirstnameError(true);
        setDataValue({ ...dataValue, [name]: "" });
        return false;
      } else {
        setFirstnameError(false);
        setDataValue({ ...dataValue, [name]: value });
      }
    }
    if (name == "last_name") {
      if (!value) {
        setLastnameError(true);
        setDataValue({ ...dataValue, [name]: "" });
        return false;
      } else {
        setLastnameError(false);
        setDataValue({ ...dataValue, [name]: value });
      }
    }

    if (name == "phone") {
      if (!value) {
        setPhoneError(true);
        setDataValue({ ...dataValue, [name]: "" });
        return false;
      } else {
        setPhoneError(false);
        setDataValue({ ...dataValue, [name]: value });
      }
    }

    if (name == "email") {
      if (!value) {
        setEmailError(true);
        setDataValue({ ...dataValue, [name]: "" });
        return false;
      } else {
        setEmailError(false);
        setDataValue({ ...dataValue, [name]: value });
      }
    }

    if (name == "password") {
      if (!value) {
        setPasswordError(true);
        setDataValue({ ...dataValue, [name]: "" });
        return false;
      } else {
        setPasswordError(false);
        setDataValue({ ...dataValue, [name]: value });
      }
    }
  };

  const activeHandler = () => {
    setDataValue({ ...dataValue, ["active"]: !dataValue.active });
  };

  const selectedValue = () => {
    let drop_value = document.getElementById("role_dropdown").value;
    if (!drop_value) {
      setRoletypeError(true);
      setDataValue({ ...dataValue, ["role_type"]: "" });
      return false;
    } else {
      setRoletypeError(false);
      setDataValue({ ...dataValue, ["role_type"]: drop_value });
    }
  };

  const handleMouseUpSelect = () => {
    let drop_value = document.getElementById("role_dropdown").value;
    if (!drop_value) {
      setRoletypeError(true);
      return false;
    } else {
      setRoletypeError(false);
    }
  };

  const changeDateHandler = (date, name) => {
    var value = new Date(date);
    if (value) {
      var DateFormate = moment(value).format("YYYY-MM-DD");
    }
    if (name == "from_to") {
      if (!DateFormate) {
        setFrom_toerror(true);
        setDataValue({ ...dataValue, [name]: "" });
        setvalidDate(new Date());
        return false;
      } else {
        setFrom_toerror(false);
        setDataValue({ ...dataValue, [name]: DateFormate });
        setvalidDate(value);
      }
    }

    if (name == "valid_to") {
      if (!DateFormate) {
        setValid_toerror(true);
        setDataValue({ ...dataValue, [name]: "" });
        return false;
      } else {
        setValid_toerror(false);
        setDataValue({ ...dataValue, [name]: DateFormate });
        setValidfromError(DateFilter(DateFormate));
        // setStartDate(value)
      }
    }
  };

  const handleMouseUpDate = (date, name) => {
    var value = new Date(date);
    if (value) {
      var DateFormate = moment(value).format("YYYY-MM-DD");
    }
    if (name == "from_to") {
      if (!DateFormate || DateFormate == "Invalid date") {
        let value = document.getElementById("from_to").value;
        if (!value) {
          setFrom_toerror(true);
          return false;
        } else {
          setFrom_toerror(false);
        }
      } else {
        setFrom_toerror(false);
      }
    }
    if (name == "valid_to") {
      if (!DateFormate || DateFormate == "Invalid date") {
        let value = document.getElementById("valid_to").value;
        if (!value) {
          setValid_toerror(true);
          return false;
        } else {
          setValid_toerror(false);
        }
      } else {
        setValid_toerror(false);
      }
    }
  };
  const handleMouseUp = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "first_name") {
      if (!value) {
        setFirstnameError(true);
        return false;
      } else {
        setFirstnameError(false);
      }
    }
    if (name == "last_name") {
      if (!value) {
        setLastnameError(true);
        return false;
      } else {
        setLastnameError(false);
      }
    }
    if (name == "phone") {
      if (!value) {
        setPhoneError(true);
        return false;
      } else {
        setPhoneError(false);
      }
    }
    if (name == "email") {
      if (!value) {
        setEmailError(true);
        return false;
      } else {
        setEmailError(false);
      }
    }
    if (name == "password") {
      if (!value) {
        setPasswordError(true);
        return false;
      } else {
        setPasswordError(false);
      }
    }
  };

  const HandleSubmit = async () => {
    var payload = {
      user: {
        first_name: dataValue.first_name,
        last_name: dataValue.last_name,
        email: dataValue.email,
        password: dataValue.password,
      },
      username: dataValue.username,
      email: dataValue.email,
      phone: dataValue.phone,
      is_active: dataValue.active,
      from_to: moment(dataValue.from_to).format("YYYY-MM-DD"),
      valid_to: moment(dataValue.valid_to).format("YYYY-MM-DD"),
      role_type: dataValue.role_type,
      userid: userid,
    };

    const response = await UserRegistration(payload);
    if (userid > 0) {
      if (response?.status === 200 && response?.data) {
        history.push("/user");
      } else {
        console.error(response.data, "error HandleSubmit");
      }
    } else {
      if (response?.status === 201 && response?.data) {
        history.push("/user");
      } else {
        console.error(response.data, "error HandleSubmit");
      }
    }
  };

  const GetUser = async () => {
    let payload = { userid: userid };
    const response = await GetUserById(payload);
    if (response?.status === 200 && response?.data) {
      setDataValue(response.data);
      setValidfromError(DateFilter(response.data.valid_to));
    } else {
      if (
        response.status === 403 &&
        response.data.detail ===
          "You do not have permission to perform this action."
      ) {
        ToastMessage(
          "error",
          "You do not have permission to perform this action."
        );
        history.push("/user");
      }
      console.error(response.data.detail, "error GetUser");
      console.error(response.status, "error GetUser");
    }
  };

  useEffect(() => {
    if (userid > 0) {
      GetUser();
      setFromDate(dataValue.from_to);
      // setButtonDisable(false);
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    // else {
    //   setIsLoaded(true);
    // }
    // DateFilter(dataValue.from_to, dataValue.valid_to);
  }, []);

  if (loader) {
    return <Loader height='100px' width='100px'/>;
  } else {
    return (
      <>
       <div className="mb-5">

        <BackButton path="/user" />
        <div className="d-flex justify-content-center mt-1">
          <div className="custom-header">User Detail</div>
        </div>
       </div>
        <div className="container custom-text-family">
          <div className="row">
            <form className="justify-content-center">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="custom-label">First Name</label>
                    <input
                      type="text"
                      className="custom-input"
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      value={dataValue.first_name}
                      onChange={handleOnChange}
                      onBlur={handleMouseUp}
                      style={{ marginBottom: first_nameError ? "0px" : "15px" }}
                    />
                    {first_nameError && (
                      <span
                        aria-label="validation-message"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        First Name is required.
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className="form-group"
                    style={{ marginBottom: last_nameError ? "0px" : "15px" }}
                  >
                    <label className="custom-label">Last Name</label>
                    <input
                      type="text"
                      className="custom-input"
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      value={dataValue.last_name}
                      onChange={handleOnChange}
                      onBlur={handleMouseUp}
                    />
                    <span
                      aria-label="validation-message"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {last_nameError && "Last Name is required."}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="custom-label">Email Id</label>
                    <input
                      type="text"
                      className="custom-input"
                      id="email"
                      name="email"
                      placeholder="Email Id"
                      value={dataValue.email}
                      onChange={handleOnChange}
                      onBlur={handleMouseUp}
                      style={{ marginBottom: emailError ? "0px" : "15px" }}
                      disabled={userid > 0 ? "disabled" : ""}
                    />
                    {emailError && (
                      <span
                        aria-label="validation-message"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        Email is required.
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="custom-label">Phone Number</label>
                    <input
                      type="text"
                      className="custom-input"
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                      value={dataValue.phone}
                      onChange={handleOnChange}
                      onBlur={handleMouseUp}
                      style={{ marginBottom: phoneError ? "0px" : "15px" }}
                    />
                    {phoneError && (
                      <span
                        aria-label="validation-message"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        Phone is required.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {userid > 0 ? (
                    <></>
                  ) : (
                    <div className="form-group">
                      <label className="custom-label">Password</label>
                      <input
                        type="password"
                        className="custom-input"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleOnChange}
                        onBlur={handleMouseUp}
                        style={{ marginBottom: passwordError ? "0px" : "15px" }}
                      />
                      {passwordError && (
                        <span
                          aria-label="validation-message"
                          style={{ color: "red", fontSize: "12px" }}
                        >
                          Password is required.
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  {/* <div className="form-group">
                  <label className="custom-label">User Image</label>
                  <input
                    type="text"
                    className="custom-input"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleOnChange}
                    onBlur={handleMouseUp}
                    style={{ marginBottom: phoneError ? "0px" : "15px" }}
                  />
                  {phoneError && (
                    <span
                      aria-label="validation-message"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      Phone is required.
                    </span>
                  )}
                </div> */}
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-3 justify-content-center">
                  <div className="row">
                    <div className="col-md-3 justify-content-center mt-4">
                      <span className="custom-label">Active: </span>
                    </div>
                    <div className="col-md-6 ">
                      <div className="form-check form-switch mt-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          // onClick={}
                          value={dataValue.active}
                          checked={dataValue.active}
                          onChange={activeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 justify-content-center">
                  <div className="dropdown mt-4">
                    <select
                      id="role_dropdown"
                      className="btn btn dropdown-toggle custom-role-dropdown"
                      value={dataValue.role_type}
                      onChange={selectedValue}
                      onBlur={handleMouseUpSelect}
                      placeholder="Select Role"
                    >
                      <option
                        className="dropdown-item"
                        value=""
                        defaultValue
                        disabled
                      >
                        Select Role
                      </option>
                      <option
                        className="dropdown-item"
                        title={dataValue.role_type}
                        value="Super User"
                      >
                        Super User
                      </option>
                      <option className="dropdown-item" value="Customer">
                        Customer
                      </option>
                    </select>
                  </div>
                  {roletypeError && (
                    <span
                      aria-label="validation-message"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      Please Select Role.
                    </span>
                  )}
                </div>
                <div className="col-md-3 justify-content-center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                      <DatePicker
                        className="custom-text-family"
                        // shouldDisableDate={true}
                        minDate={startMinDate}
                        margin="normal"
                        label="From To :"
                        name="from_to"
                        id="from_to"
                        value={dataValue.from_to ? dataValue.from_to : null}
                        format="dd-MM-yyyy"
                        onChange={(date) => changeDateHandler(date, "from_to")}
                        onClickCapture={(date) =>
                          handleMouseUpDate(date, "from_to")
                        }
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  {from_toerror && (
                    <span
                      aria-label="validation-message"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      From To is required.
                    </span>
                  )}
                </div>
                <div className="col-md-3 justify-content-center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                      <DatePicker
                        className="custom-text-family"
                        margin="normal"
                        label="Valid To :"
                        name="valid_to"
                        id="valid_to"
                        minDate={startvalidDate}
                        value={dataValue.valid_to ? dataValue.valid_to : null}
                        format="dd-MM-yyyy"
                        disabled={dataValue.from_to ? false : true}
                        minDateMessage="Should be greater than or equal to today's date"
                        onChange={(date) => changeDateHandler(date, "valid_to")}
                        onClickCapture={(date) =>
                          dataValue.from_to
                            ? handleMouseUpDate(date, "valid_to")
                            : ""
                        }
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  {valid_toerror && (
                    <span
                      aria-label="validation-message"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      Valid To is required.
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          {userid > 0 ? (
            <button
              className="btn btn-success"
              onClick={HandleSubmit}
              disabled={
                !dataValue.phone ||
                !dataValue.email ||
                !dataValue.role_type ||
                !dataValue.from_to ||
                !dataValue.first_name ||
                !dataValue.valid_to ||
                !dataValue.last_name ||
                !validfromError
              }
            >
              Submit
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={HandleSubmit}
              disabled={
                !dataValue.phone ||
                !dataValue.email ||
                !dataValue.role_type ||
                !dataValue.from_to ||
                !dataValue.first_name ||
                !dataValue.valid_to ||
                !dataValue.last_name ||
                !dataValue.password
              }
            >
              Submit
            </button>
          )}

          <div>&nbsp;</div>
          <div className="btn btn-secondary mr-1">
            <Link to="/user">Cancel</Link>
          </div>
        </div>
      </>
    );
  }
};

export default UserCreation;
