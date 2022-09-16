import { GlobalGymInfo } from "../../context";
import React, { Component, useEffect, useState, Fragment } from "react";

import Paper from "@material-ui/core//Paper";
import Table from "@material-ui/core//Table";
import TableBody from "@material-ui/core//TableBody";
import TableCell from "@material-ui/core//TableCell";
import TableContainer from "@material-ui/core//TableContainer";
import TableHead from "@material-ui/core//TableHead";
import TablePagination from "@material-ui/core//TablePagination";
import TableRow from "@material-ui/core//TableRow";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import DialogTitle from "@material-ui/core/DialogTitle";
import API from "../../context/API";
import ReactPaginate from "react-paginate";
import "../../App.css";
import Header from "../authentication/header";
const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  // { id: "UserName", label: "UserName", minWidth: 170 },
  { id: "Email", label: "Email", minWidth: 170 },
  { id: "Phone", label: "Phone", minWidth: 170 },
  { id: "Varified", label: "Varified", minWidth: 170 },
  { id: "Active", label: "Active", minWidth: 170 },
  { id: "SuperUser", label: "SuperUser", minWidth: 170 },
  { id: "Action", label: "Action", minWidth: 170 },
];

const UserList = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [studentList, setStudentlist] = useState([]);
  const [resetpagenumber, setResetpagenumber] = useState(null);

  const filter_initial_value = {
    value: "",
  };
  const [filter_, setFilter_] = useState(filter_initial_value);

  const handleClose = () => {
    setOpen(false);
  };

  const StudentListApi = () => {
    API.get("http://127.0.0.1:8000/api/user-list/")
      .then((response) => {
        if (response && response?.data) {
          setStudentlist(response.data.results);
          setCount(response.data.count);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const FetchCommands = async (currentpage) => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/user-list/?page=${currentpage}`
    );
    const data = await res.json();
    return data;
  };
  const FetchCommandfilter = (currentpage, payload) => {
    API.post(
      `http://127.0.0.1:8000/api/user-filter/?page=${currentpage}`,
      payload
    )
      .then((response) => {
        if (response && response?.data) {
          setStudentlist(response.data.results);
          setCount(response.data.count);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageClick = async (data) => {
    let getData = data.selected + 1;
    if (!filter_.value) {
      const res = await FetchCommands(getData);
      setStudentlist(res.results);
      setCount(res.count);
    } else {
      const res = await FetchCommandfilter(getData, filter_);
      // setStudentlist(res.results);
      // setCount(res.count);
    }
  };

  useEffect(() => {
    StudentListApi();
  }, []);

  const handleChange = (event) => {
    setFilter_({ ...filter_, value: event.target.value });
  };

  const StudentListFilter = () => {
    if (!filter_.value) {
    } else {
      API.post("http://127.0.0.1:8000/api/user-filter/", filter_)
        .then((response) => {
          if (response && response?.data) {
            setStudentlist(response.data.results);
            setCount(response.data.count);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const Reset = () => {
    const element = document.getElementById("outlined-search");
    element.value = "";
    setFilter_({ ...filter_, value: "" });
    StudentListApi();
    setResetpagenumber(0);
    setTimeout(() => {
      setResetpagenumber(null);
    }, 1000);
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
            to="/user-creation/0"
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
              {count > 0 ? (
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
                            <TableCell>{row.id}</TableCell>
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
                              {row.is_verified ? "True" : "False"}
                            </TableCell>
                            <TableCell>
                              {row.user.is_active ? "True" : "False"}
                            </TableCell>
                            <TableCell>
                              {row.user.is_superuser ? "True" : "False"}
                            </TableCell>
                            <TableCell>
                              <div style={{ display: "flex" }} key={row.id}>
                                <Fragment key={row.id}>
                                  <Tooltip title="Update">
                                    <IconButton
                                      arial-label="Update"
                                      className="vieweBtn editBtn"
                                      style={{ color: "green" }}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                      }}
                                    >
                                      <Link
                                        to={`/update-user/${row.user.id}`}
                                        style={{ color: "black" }}
                                        key={row.user.id}
                                      >
                                        <Edit />
                                      </Link>
                                    </IconButton>
                                  </Tooltip>
                                </Fragment>
                                <Fragment>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      arial-label="Delete"
                                      className="vieweBtn deleteBtn"
                                      style={{ color: "red" }}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        // handleClickOpen(row.id);
                                      }}
                                    >
                                      <DeleteOutlined />
                                    </IconButton>
                                  </Tooltip>
                                </Fragment>
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
              )}
            </Table>
          </TableContainer>
        </Paper>
        {count > 0 ? (
          <></>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="my-3">
              <span style={{ fontSize: "20px", color: "gray" }}>
                No Record Found
              </span>
            </div>
          </div>
        )}
        {count > 0 ? (
          <div className="mx-0 mt-2 d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(count / 1)}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-item"}
              activeClassName={"active"}
              forcePage={resetpagenumber}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UserList;
