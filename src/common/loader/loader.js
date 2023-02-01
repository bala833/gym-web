import react from "react";
// style={{filter : 'blur(1px)', backgroundPosition : 'center', backgroundRepeat : "no-repeat", backgroundSize : 'cover'}}
const Loader = ({height = '50px', width ='200px'}) => {
  return (
    <div  style={{top : '50%', left : '50%', transform : 'translate(-50%, -50%)', position : 
    "absolute"}}>
      {" "}
      <img style={{height : height ,width :width}}
        src={require("../../assests/loader/Eclipse_loader.svg").default}
        alt="mySvgImage"
      />
    </div>
  );
};

export default Loader;
