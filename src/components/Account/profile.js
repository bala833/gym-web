import React, { useState, useEffect, useContext } from "react";
import Header from "../authentication/header";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { IconButton, Tooltip } from "@mui/material";
import { Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { GetUserByToken, Logout } from "../../Api/services";
import { useHistory } from "react-router-dom";
import moment from "moment";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "./profile.css";
import { GlobalGymInfo } from "../../context";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const Profile = () => {
  const [userDetail, setUserDetail] = useState({});
  let history = useHistory();
  const { logout } = useContext(GlobalGymInfo);

  const GetUserDetail = async () => {
    const response = await GetUserByToken();
    if (response?.status === 400 && response?.data) {
      if (response.data == "Invalid Token") {
        localStorage.removeItem("token");
        Logout();
        console.log("Invalid Token", response?.data);
        history.push("/");
      }
    } else {
      setUserDetail(response.data);
    }
  };

  useEffect(() => {
    GetUserDetail();
  }, []);
  return (
    <>
      <Header />
      <div className="mt-3">
        <div className="row">
          <div className="col-md-1">
            {/* backbutton */}
            <div className=" addUserButtonContainer my-1 mx-2 ">
              <button class="addNewUser">
                <Link to="/">
                  <KeyboardArrowLeftIcon />
                  GO Back
                </Link>
              </button>
            </div>
          </div>
          <div className="col-md-11"></div>
        </div>
      </div>
      <div className="container mt-1">
        <div className="row ">
          {/* user image */}
          <div className="d-flex justify-content-center">
            <div className="userimage">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt="Bala"
                  style={{ width: 80, height: 80 }}
                  src="/static/images/avatar/1.jpg"
                />
              </StyledBadge>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className=" d-flex col-md-12">
            <div
              className="col-md-6"
              style={{
                display: "flex",
                justifyContent: "end",
                width: "50%",
              }}
            >
              <input
                type="text"
                className="profile-custom-input"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={`First Name : ${userDetail.first_name}`}
                disabled
                style={{
                  width: "50%",
                }}
              />
            </div>
            <div
              className="col-md-6"
              style={{
                display: "flex",
                width: "50%",
                marginLeft: "5px",
              }}
            >
              <input
                type="text"
                className="profile-custom-input"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={`Last Name : ${userDetail.last_name}`}
                disabled
                style={{
                  width: "50%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className=" d-flex col-md-12">
            <div
              className="col-md-6"
              style={{
                display: "flex",
                justifyContent: "end",
                width: "50%",
              }}
            >
              <input
                type="text"
                className="profile-custom-input"
                id="email"
                name="email"
                placeholder="Email Name"
                value={`Email : ${userDetail.email}`}
                disabled
                style={{
                  width: "50%",
                }}
              />
            </div>
            <div
              className="col-md-6"
              style={{
                display: "flex",
                width: "50%",
                marginLeft: "5px",
              }}
            >
              <input
                type="text"
                className="profile-custom-input"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                value={`Phone : ${userDetail.phone}`}
                disabled
                style={{
                  width: "50%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className=" d-flex col-md-12">
            <div
              className="col-md-6"
              style={{
                display: "flex",
                justifyContent: "end",
                width: "50%",
              }}
            >
              <input
                type="text"
                className="profile-custom-input"
                id="from_date"
                name="from_date"
                placeholder="07-09-2022"
                value={`From To : ${
                  userDetail.from_to
                    ? moment(userDetail.from_to).format("DD-MM-YYYY")
                    : ""
                }`}
                format="dd-MM-yyyy"
                disabled
                style={{
                  width: "50%",
                }}
              />
            </div>
            <div
              className="col-md-6"
              style={{
                display: "flex",
                width: "50%",
                marginLeft: "5px",
              }}
            >
              <input
                type="text"
                className="profile-custom-input"
                id="valid_date"
                name="valid_date"
                value={`Valid To : ${
                  userDetail?.valid_to
                    ? moment(userDetail.valid_to).format("DD-MM-YYYY")
                    : ""
                }`}
                format="dd-MM-yyyy"
                disabled
                style={{
                  width: "50%",
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mt-3 ">
          {/* user image */}
          <div className="d-flex justify-content-center">
            <select
              id="role_dropdown"
              className="btn btn dropdown-toggle custom-role-dropdown"
              value="Super User"
              placeholder="Select Role"
              disabled
              style={{
                width: "50%",
              }}
            >
              <option className="dropdown-item" value="Super User" selected>
                Super User
              </option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <div className=" row">
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex justify-content-end">
              <Tooltip title="Update User">
                <IconButton
                  arial-label="Update"
                  className="vieweBtn editBtn"
                  style={{ color: "green" }}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Link style={{ color: "black" }}>
                    <Edit />
                  </Link>
                </IconButton>
              </Tooltip>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
