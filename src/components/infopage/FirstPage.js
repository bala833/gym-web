import React from "react";
import { Link } from "react-router-dom";

const FirstPage = () => {
  return (
    <div>
      Welcome to Fitcon Please login
      <div>
        <button type="button" class="btn btn-link">
          <Link to="/login">Link</Link>
        </button>
      </div>
    </div>
  );
};

export default FirstPage;
