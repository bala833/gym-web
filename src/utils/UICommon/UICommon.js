import react from "react";

export default function ActiveDeactiveUI(props) {
  const {condition , dValue, dValue2} = props
  return (
      <div
        style={{
          background: "#ffefef",
          minHeight: "23px",
          borderRadius: "22px",
          width: "86px",
        }}
      >
        <span
          style={{
            height: "9px",
            width: "9px",
            backgroundColor: "green ",
            borderRadius: "50%",
            display: "inline-block",
            margin: "7px 8px -1px 12px",
          }}
        ></span>
        <span style={{ fontSize: "12px" }}>{condition ? dValue : dValue2}</span>
      </div>
  );
}
