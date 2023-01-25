import react, { useState } from "react";
import { RE_DIGIT } from "../../utils/Regex/Allregex";
import "./otp.css";

const Otp = () => {
  const initialOtp = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    opt6: "",
  };
  const [otp, setOtp] = useState(initialOtp);

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

  return (
    <div>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-4 text-center box-width">
            <div class="row">
              <div class="col-sm-12 mt-custom mb-5 bgWhite">
                <div class="title">Verify OTP</div>

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
                <button class=" mt-4 mb-4 customBtn">Resend Otp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
