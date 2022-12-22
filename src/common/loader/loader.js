import react from "react";
const Loader = () => {
  return (
    <div  style={{top : '50%', left : '50%', transform : 'translate(-50%, -50%)', position : 
    "absolute"}}>
      {" "}
      <img
        src={require("../../assests/loader/Eclipse_loader.svg").default}
        alt="mySvgImage"
      />
    </div>
  );
};

export default Loader;
