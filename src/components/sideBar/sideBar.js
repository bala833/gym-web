import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Link, Router } from "react-router-dom";
import "./sideBar.css";

const SideBar = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [activemenu, setactivemenu] = useState("");
  const [menuName, setMenuName] = useState("home");
  const [menuColor, setMenuColor] = useState("home");

  const showSubnav = useCallback(
    () => [setMenuName("asdfasdf"), setSubnav(true)],
    [menuName, menuColor, subnav]
  );
  const closeSubnav = useCallback(
    () => [setMenuName("jhggjhgg"), setSubnav(false)],
    [menuName, menuColor, subnav]
  );

  const changeValueSelected = () => {
    setMenuName("asdfasdfasfd");
  };

  const handleActiveMenu = () => {
    setSubnav(true);
  };

  const getCurrentLocation = () => {
    const location = window.location.pathname;
    var newStr = location.replace("/", "");
    setMenuName(newStr);
    setMenuColor(newStr);
    // var data = str(newStr);
    console.log(newStr, typeof newStr, "window.location.pathname");
    console.log(typeof newStr, "typeof");
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      {/* parent */}

      <div
        className="menu-list"
        onMouseLeave={closeSubnav}
        onClick={getCurrentLocation}
      >
        <div onMouseOverCapture={showSubnav}>
          {item.path ? (
            <Link
              to={item?.path ? item?.path : "/bala"}
              className="warpsidebar-link"
              key={item.title}
            >
              <div
                className="d-flex  align-items-center  "
                style={{
                  marginLeft: "-1px",
                  color: item?.subManusLists?.includes(menuColor)
                    ? "#32acc28f"
                    : "",
                }}
              >
                <span className="warpsidebar-icon">{item.icon}</span>
                <span className="warpsidebr-text">{item.title}</span>
              </div>
            </Link>
          ) : (
            <div
              className="d-flex  align-items-center  "
              style={{
                marginLeft: "-1px",
                color: item?.subManusLists?.includes(menuColor)
                  ? "#32acc28f"
                  : "",
              }}
              key={item.title}
            >
              <span className="warpsidebar-icon">{item.icon}</span>
              <span className="warpsidebr-text">{item.title}</span>
            </div>
          )}
          {/* 1 child level  */}
          {(item?.subManusLists?.includes(menuName) ? !subnav : subnav) &&
            item.subNav?.map((subitem, index) => {
              return (
                <>
                  <Link
                    className="warpsubsidebar-link"
                    to={subitem.path}
                    key={index}
                  >
                    <div className="child-list mt-3" key={index}>
                      <div
                        className="d-flex  align-items-center  "
                        style={{
                          marginLeft: "-1px",
                          color:
                            subitem.activename === menuColor ? "#32acc28f" : "",
                        }}
                      >
                        {subitem?.icon && (
                          <span className="warpsub-icon">{subitem.icon}</span>
                        )}
                        <span className="warpsub-text">{subitem.title}</span>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
