import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";
import './goBack.css'
import { useHistory } from "react-router-dom";

const BackButton = (path) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(path?.path);
  };

  return (
    <div className="mt-3">
          <div className=" addUserButtonContainer my-1 mx-2 ">
            <button className="backButton" onClick={handleClick}>
              <KeyboardArrowLeftIcon />
              <span className="textStyle">
              GO Back
              </span>
            </button>
          </div>
    </div>
  );
};

export default BackButton;
