import React, { Component, useEffect, useState, Fragment } from "react";

import Paper from "@material-ui/core//Paper";
import Table from "@material-ui/core//Table";
import TableBody from "@material-ui/core//TableBody";
import TableCell from "@material-ui/core//TableCell";
import TableContainer from "@material-ui/core//TableContainer";
import TableHead from "@material-ui/core//TableHead";
import TableRow from "@material-ui/core//TableRow";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import API from "../../context/API";
import ReactPaginate from "react-paginate";
import "../../App.css";
import "./userList.css";
import Header from "../header/header";
import { base_url } from "../../Api/services";

import Typography from "@material-ui/core/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import Loader from "../../common/loader/loader";
import Form from "react-bootstrap/Form";
import ActiveDeactiveUI from "../../utils/UICommon/UICommon";

const columns = [
  // { id: "id", label: "ID", minWidth: 170 },
  // { id: "UserName", label: "UserName", minWidth: 170 },
  { id: "Email", label: "Email", minWidth: 170 },
  { id: "Phone", label: "Phone", minWidth: 170 },
  { id: "Varified", label: "Varified", minWidth: 170 },
  { id: "Status", label: "Status", minWidth: 170 },
  { id: "Roles", label: "Roles", minWidth: 170 },
  { id: "Action", label: "Action", minWidth: 170 },
];

const actionMenu = [
  {
    title: "edit",
    path: "/user",
    icon: <ModeEditOutlineTwoToneIcon fontSize="small" />,
  },
  {
    title: "deactivate",
    path: "",
    icon: <ModeEditOutlineTwoToneIcon fontSize="small" />,
  },
];
const UserList = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [studentList, setStudentlist] = useState([]);
  const [resetpagenumber, setResetpagenumber] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [limit, setLimit] = useState(1);
  const [payload, setPayload] = useState([]);
  const [initialCall, setInitialCall] = useState(true);

  const filter_initial_value = {
    value: "",
    limit: 1,
  };
  const [searchData, setSearchData] = useState(filter_initial_value);
  const [filter_, setFilter_] = useState(filter_initial_value);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageLimit = async () => {
    if (!filter_.value) {
      setPayload({ ...payload, limit: limit });
      const response = await API.post(`${base_url}api/user-list/`, {
        limit: limit,
      });
      setStudentlist(response.data.results);
      setCount(response.data.count);
      setLoader(true);
      setResetpagenumber(0);
      setTimeout(() => {
        setResetpagenumber(null);
      }, 200);
      setTimeout(() => {
        setResetpagenumber(0);
      }, 200);
    } else {
      const paload = {
        value: filter_.value,
        limit: limit,
      };
      API.post(`${base_url}api/user-filter/`, paload)
        .then((response) => {
          if (response && response?.data) {
            setStudentlist(response.data.results);
            setCount(response.data.count);
            setLoader(true);
            setResetpagenumber(0);
            setTimeout(() => {
              setResetpagenumber(null);
            }, 200);
            setTimeout(() => {
              setResetpagenumber(0);
            }, 200);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoader(false);
        });
    }
  };

  const StudentListApi = () => {
    API.get(`${base_url}api/user-list/`)
      .then((response) => {
        if (response && response?.data) {
          setStudentlist(response.data.results);
          setCount(response.data.count);
          setLoader(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  const FetchCommands = async (currentpage) => {
    setLoader(false);
    const res = await fetch(`${base_url}api/user-list/?page=${currentpage}`);
    const data = await res.json();
    setLoader(true);
    return data;
  };
  const FetchCommandfilter = (currentpage, payload) => {
    API.post(`${base_url}api/user-filter/?page=${currentpage}`, payload)
      .then((response) => {
        if (response && response?.data) {
          setStudentlist(response.data.results);
          setCount(response.data.count);
          setLoader(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  const handlePageClick = async (data) => {
    setLoader(false);
    let getData = data.selected + 1;
    if (!searchData.value) {
      const res = await FetchCommands(getData);
      setStudentlist(res.results);
      setCount(res.count);
    } else {
      const res = await FetchCommandfilter(getData, searchData);

      // setStudentlist(res.results);
      // setCount(res.count);
    }
  };

  useEffect(() => {
    setLoader(true);
    if (initialCall) {
      setLimit(1);
      setTimeout(() => {
        StudentListApi();
      }, 2000);
    }
    setInitialCall(false);
    setLoader(false);
    handlePageLimit();
    setLoader(false);
  }, [limit]);

  const handleChange = (event) => {
    setFilter_({ ...filter_, value: event.target.value });
  };

  const StudentListFilter = () => {
    if (!filter_.value) {
    } else {
      const paload = {
        value: filter_.value,
        limit: limit,
      };
      setSearchData({ ...filter_, value: filter_.value });
      API.post(`${base_url}api/user-filter/`, paload)
        .then((response) => {
          if (response && response?.data) {
            setStudentlist(response.data.results);
            setCount(response.data.count);
            setLoader(true);
            setTimeout(() => {
              setResetpagenumber(null);
            }, 200);
            setTimeout(() => {
              setResetpagenumber(0);
            }, 200);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoader(false);
        });
    }
  };

  const Reset = () => {
    setLoader(false);
    const element = document.getElementById("outlined-search");
    element.value = "";
    setFilter_({ ...filter_, value: "" });
    setLimit(1);
    StudentListApi();
    setResetpagenumber(0);
    setSearchData({ ...filter_, value: "" });
    setTimeout(() => {
      setResetpagenumber(null);
    }, 200);
    setTimeout(() => {
      setResetpagenumber(0);
    }, 200);
    setLoader(true);
  };

  return (
    <>
      <Header />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Are you sure to delete this record.
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <div className="row mb-3 mx-2">
        <div className="col-md-3 mt-2">
          <Link
            to="/user/0"
            className="btn btn-primary"
            style={{ whiteSpace: "nowrap" }}
          >
            Add Student
          </Link>
        </div>
        <div className="col-md-9 mt-2">
          <div className="row">
            <div className="col-md-5"></div>
            <div className="col-md-4">
              <input
                type="text"
                className="input-search-box"
                id="outlined-search"
                placeholder="Search"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <div className="col-md-12 d-flex justify-content-around">
                <button
                  className="search-btn buttonStyle"
                  onClick={StudentListFilter}
                >
                  Search
                </button>
                <span className="">&nbsp;</span>
                <button
                  className="reset-btn buttonStyle"
                  onClick={() => Reset()}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 20 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "800px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {loader ? (
                count > 0 ? (
                  <TableBody>
                    {studentList.map((row) => {
                      return (
                        <TableRow
                          hover
                          // {studentList.length > 0 ? <></> : <></>}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          style={{ width: 10 }}
                        >
                          {row.error ? (
                            <></>
                          ) : (
                            <>
                              {/* <TableCell>{row.id}</TableCell> */}
                              {/* <TableCell>
                              {row.user.username.length < 10 ? (
                                row.user.username
                              ) : (
                                <Tooltip title={row.user.username}>
                                  <span>
                                    {row.user.username.substring(0, 10) + `...`}
                                  </span>
                                </Tooltip>
                              )}
                            </TableCell> */}
                              <TableCell>{row.email}</TableCell>
                              <TableCell>{row.phone}</TableCell>
                              <TableCell>
                              <ActiveDeactiveUI
                               condition={row.is_verified}
                               dValue = 'Yes'
                               dValue2= 'No'
                               />
                              </TableCell>
                              <TableCell>
                              <ActiveDeactiveUI
                               condition={row.user.is_active}
                               dValue = 'Active'
                               dValue2= 'Deactive'
                               />
                              </TableCell>
                              <TableCell>
                                {row.user.is_superuser
                                  ? "Super User"
                                  : "Customer"}
                              </TableCell>
                              <TableCell>
                                <div style={{ display: "flex" }} key={row.id}>
                                  <IconButton sx={{ p: 0 }}>
                                    <MoreHorizIcon
                                      onClick={handleOpenUserMenu}
                                    />
                                  </IconButton>
                                  <Menu
                                    sx={{ mt: "20px", ml: "20px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                      vertical: "top",
                                      horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                  >
                                    {actionMenu.map((item) => {
                                      return (
                                        <MenuItem
                                          key={item.title}
                                          onClick={handleCloseUserMenu}
                                        >
                                          <Typography textalign="center">
                                            {" "}
                                            <Link
                                              to={`${item.path}/${row.user.id}`}
                                              style={{ color: "black" }}
                                              key={row.user.id}
                                            >
                                              <div className="justify-content-between">
                                                <span>{item.icon}</span>
                                                <span
                                                  style={{ marginLeft: "35px" }}
                                                >
                                                  {item.title}
                                                </span>
                                              </div>
                                            </Link>
                                          </Typography>
                                        </MenuItem>
                                      );
                                    })}
                                  </Menu>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                ) : (
                  <></>
                )
              ) : (
                <Loader height="100px" width="100px" />
              )}
            </Table>
          </TableContainer>
        </Paper>
        {loader ? (
          count > 0 ? (
            <></>
          ) : (
            <div className="d-flex justify-content-center">
              <div className="my-3">
                <span style={{ fontSize: "20px", color: "gray" }}>
                  No Record Found
                </span>
              </div>
            </div>
          )
        ) : null}

        {count > 0 ? (
          <div className="mx-0 mt-2 d-flex justify-content-end">
            <div>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(count / limit)}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"nextPreviousbtn"}
                previousLinkClassName={"page-link"}
                nextClassName={"nextPreviousbtn"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-item"}
                activeClassName={"active"}
                forcePage={resetpagenumber}
              />
            </div>

            <div className="justify-content-end" style={{ width: "5%"}}>
{/* react bs  */}
              <Form.Select
                aria-label="Default select example"
                size="sm"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value="1">1</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Form.Select>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UserList;
