import react, { useEffect, useState } from "react";

export default function ActiveDeactiveUI(props) {
  const { condition, dValue, dValue2 } = props;
  const [color, setColor] = useState("");

  useEffect(() => {
      if (!condition) {
        setColor("red");
      } else {
        setColor("green");
    }

  },[condition, dValue, dValue2])


  console.log(condition);
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
          backgroundColor: color,
          borderRadius: "50%",
          display: "inline-block",
          margin: "7px 8px -1px 12px",
        }}
      ></span>
      <span style={{ fontSize: "12px" }}>{condition ? dValue : dValue2}</span>
    </div>
  );
}
