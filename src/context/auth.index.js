import React, { Component, Context, createContext } from "react";
import API from "./API";

export const AuthdetailInfo = createContext();

export class AuthDetail extends Component {
  state = {
    useEmail: "",
  };



  handleSetUseEmail = (value) => {
    this.setState({
        useEmail: value,
    });
  };


//   async componentDidMount() {

//   }
  render() {
    return (
      <AuthdetailInfo.Provider
        value={{
          ...this.state,
          handleSetUseEmail: this.handleSetUseEmail
        }}
      >
        {this.props.children}
      </AuthdetailInfo.Provider>
    );
  }
}
