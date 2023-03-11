import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@material-ui/core/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GetUserByToken, Logout } from "../../Api/services";
import { useHistory } from "react-router-dom";

export default function ToggleDropdown(props) {
  const { row, menus } = props;

  const [toggleDropdown, setToggleDropdown] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  let history = useHistory();

  const handleOpenUserMenu = (event) => {
    setToggleDropdown(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setToggleDropdown(null);
  };

  const GetUserDetail = async () => {
    const response = await GetUserByToken();
    if (response?.status === 400 && response?.data) {
      if (response.data == "Invalid Token") {
        localStorage.removeItem("token");
        Logout();
        history.push("/");
      }
    } else {
      setUserDetail(response.data);
    }
  };

  useEffect(() => {
    GetUserDetail();
  }, []);

  console.log(userDetail);

  return (
    <div style={{ display: "flex" }} key={row.id}>
      <IconButton sx={{ p: 0 }}>
        <MoreHorizIcon onClick={handleOpenUserMenu} />
      </IconButton>
      <Menu
        sx={{ mt: "20px", ml: "20px" }}
        id="menu-appbar"
        anchorEl={toggleDropdown}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(toggleDropdown)}
        onClose={handleCloseUserMenu}
      >
        {menus.map((item) => {
          return (
            <>
              {row?.user?.id === userDetail?.id ? (
                item?.title === "edit" ||
                item?.title === "deactivate" ? null : (
                  <MenuItem key={item.title} onClick={handleCloseUserMenu}>
                    <Typography textalign="center">
                      <Link
                        to={`${item?.path}/${row?.user?.id}`}
                        style={{ color: "black" }}
                        key={row?.user?.id}
                      >
                        <div className="justify-content-between">
                          <span>{item?.icon}</span>
                          <span style={{ marginLeft: "35px" }}>
                            {item?.title}
                          </span>
                        </div>
                      </Link>
                    </Typography>
                  </MenuItem>
                )
              ) : (
                <MenuItem key={item.title} onClick={handleCloseUserMenu}>
                  <Typography textalign="center">
                    <Link
                      to={`${item?.path}/${row?.user?.id}`}
                      style={{ color: "black" }}
                      key={row?.user?.id}
                    >
                      <div className="justify-content-between">
                        <span>{item?.icon}</span>
                        <span style={{ marginLeft: "35px" }}>
                          {item?.title}
                        </span>
                      </div>
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </>
          );
        })}
      </Menu>
    </div>
  );
}
