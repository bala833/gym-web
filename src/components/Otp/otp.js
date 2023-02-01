import react, { useEffect, useState, useContext } from "react";
import { otpVerify, Resend } from "../../Api/services";
import Loader from "../../common/loader/loader";
import { AuthdetailInfo } from "../../context/auth.index";
import { RE_DIGIT } from "../../utils/Regex/Allregex";
import { ToastMessage } from "../../utils/toastMessage/toast";
import { useHistory } from "react-router-dom";

import "./otp.css";

const Otp = () => {
  const { useEmail } = useContext(AuthdetailInfo);

  const initialOtp = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };
  const [otp, setOtp] = useState(initialOtp);
  const [loader, setLoader] = useState(false);
  let history = useHistory();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let mainValue = value.substring(value.length - 1);
    setOtp({ ...otp, [name]: mainValue });
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      if (elmnt.key !== "ArrowRight") {
        if (elmnt.key !== "ArrowLeft") {
          if (elmnt.key !== "ArrowUp") {
            if (elmnt.key !== "ArrowDown") {
              const next = elmnt.target.tabIndex;
              if (next < 6) {
                elmnt.target.form.elements[next].focus();
              }
            }
          }
        }
      }
    }
  };

  const keypress = (e) => {
    if (e.key === "ArrowLeft") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    }

    if (e.key === "ArrowRight") {
      const next = e.target.tabIndex;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const submitOtpValidation = (otpV) => {
    let value;
    if (
      otpV.otp1 &&
      otpV.otp2 &&
      otpV.otp3 &&
      otpV.otp4 &&
      otpV.otp5 &&
      otpV.otp6
    ) {
      value = true;
    } else {
      value = false;
    }
    return value;
  };

  const handleReset = async () => {
    setLoader(true);
    setOtp(initialOtp);
    const payload = {
      email: useEmail,
    };
    const response = await Resend(payload);

    if (response.status === 200) {
      ToastMessage(
        "success",
        "Otp resend successfully please, check your provided email inbox"
      );
      setLoader(false);
    } else if (response.status === 500) {
      ToastMessage(
        "error",
        "While resend otp on you email having some issue, Please contact to administrator"
      );
      setLoader(false);
    }
  };

  const handleSubmitValue = async () => {
    // {
    //   "email" : "balaprajapati02@gmail.com",
    //   "otp" : ""
    //   }
    setLoader(true);

    const otpCode =
      otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 + otp.otp5 + otp.otp6;
    const payload = {
      email: useEmail,
      otp: otpCode,
    };
    const response = await otpVerify(payload);
    console.log(response, "response");
    if (response.data.data && response.data.status === 200) {
      ToastMessage("success", "Account is verified successfully");
      setLoader(false);
      history.push("/home");
    } else if (response.data.status === 400) {
      ToastMessage("error", "Wrong Otp");
      setLoader(false);
    } else {
      ToastMessage(
        "error",
        "Something went wrong please contact Administrator"
      );
      setLoader(false);
    }

    console.log(payload);
  };
  useEffect(() => {
    if (submitOtpValidation(otp)) {
      handleSubmitValue();
    }
  }, [otp]);

  return (
    <div>
      <div class="container">
        {loader ? <Loader height="100px" width="100px" /> : null}
        <div class="row justify-content-md-center">
          <div class="col-md-4 text-center box-width">
            <div class="row">
              <div class="col-sm-12 mt-custom mb-5 bgWhite">
                <div class="title">Verify OTP {useEmail}</div>

                <form action="" class="mt-5">
                  <input
                    class="otp-input"
                    value={otp.otp1}
                    name="otp1"
                    tabIndex="1"
                    type="text"
                    placeholder="0"
                    onKeyDown={keypress}
                    onChange={handleChange}
                    onKeyUp={inputfocus}
                  />
                  <input
                    class="otp-input"
                    value={otp.otp2}
                    name="otp2"
                    tabIndex="2"
                    type="text"
                    placeholder="0"
                    onKeyDown={keypress}
                    onChange={handleChange}
                    onKeyUp={inputfocus}
                  />
                  <input
                    class="otp-input"
                    value={otp.otp3}
                    name="otp3"
                    tabIndex="3"
                    type="text"
                    placeholder="0"
                    onKeyDown={keypress}
                    onChange={handleChange}
                    onKeyUp={inputfocus}
                  />
                  <input
                    class="otp-input"
                    value={otp.otp4}
                    name="otp4"
                    tabIndex="4"
                    type="text"
                    placeholder="0"
                    onKeyDown={keypress}
                    onChange={handleChange}
                    onKeyUp={inputfocus}
                  />
                  <input
                    class="otp-input"
                    value={otp.otp5}
                    name="otp5"
                    tabIndex="5"
                    type="text"
                    placeholder="0"
                    onKeyDown={keypress}
                    onChange={handleChange}
                    onKeyUp={inputfocus}
                  />
                  <input
                    class="otp-input"
                    value={otp.otp6}
                    name="otp6"
                    tabIndex="6"
                    type="text"
                    placeholder="0"
                    onKeyDown={keypress}
                    onChange={handleChange}
                    onKeyUp={inputfocus}
                  />
                </form>
                <hr class="mt-4" />
                <button
                  class=" mt-4 mb-4 customBtn"
                  onClick={handleReset}
                  disabled={loader}
                >
                  Resend Otp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
