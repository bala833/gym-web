import React from "react";

const Dashboard = () => {
  return (
    <div className="mt-4">
      <div className="row ">
        <div className="d-flex justify-content-around col-md-12">
          <div className="col-md-3">
            <div className="card" style={{ width: "auto", height: "200px" }}>
              <h5 class="card-title d-flex justify-content-center">
                Total user :
              </h5>
            </div>
          </div>
          <div className="col-md-3 ml-1">
            <div className="card" style={{ width: "auto", height: "200px" }}>
              <h5 class="card-title d-flex justify-content-center">
                Active and Deactive users
              </h5>
            </div>
          </div>
          <div className="col-md-3 ml-1">
            <div className="card" style={{ width: "auto", height: "200px" }}>
              <h5 class="card-title d-flex justify-content-center">
                weekly Earning <br />
                Monthaly Earning <br />
                Yearly Earning
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="d-flex justify-content-around col-md-12">
          <div className="col-md-3">
            <div className="card" style={{ width: "auto", height: "200px" }}>
              <h5 class="card-title d-flex justify-content-center">
                Groth Rate by visually
              </h5>
            </div>
          </div>
          <div className="col-md-3 ml-1">
            <div className="card" style={{ width: "auto", height: "200px" }}>
              <h5 class="card-title d-flex justify-content-center">
                Trainer info
              </h5>
            </div>
          </div>
          <div className="col-md-3 ml-1">
            <div className="card" style={{ width: "auto", height: "200px" }}>
              <h5 class="card-title d-flex justify-content-center">
                Special title
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
