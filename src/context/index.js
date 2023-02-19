import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, Context, createContext } from "react";
import API from "./API";

export const GlobalGymInfo = createContext();

export class GymProvider extends Component {
  state = {
    GlobalGymName: "Gym",
    isAuth: true,
    token: "",
    selectedMenu: "home",
    ContMenuColor: "home",
  };

  AuthToken = (token_) => {
    if (token_ !== null && token_ !== undefined) {
      console.log("getted token");
      this.setState({
        token: token_,
        isAuth: true,
      });
    }
  };

  Auth = () => {
    let token_ = localStorage.getItem("token");
    if (token_ !== null && token_ !== undefined) {
      console.log("getted token");
      this.setState({
        token: token_,
        isAuth: true,
      });
    }
  };

  logout = () => {
    this.setState({
      token: "",
      isAuth: false,
    });
  };

  handlemenuSelected = (value) => {
    this.setState({
      selectedMenu: value,
    });
  };

  handleHover = () => {
    const location = window.location.pathname;
    var newStr = location.replace("/", "");
    this.setState({
      ContMenuColor: newStr,
    });
  };

  handleMenuColor = (value) => {
    this.setState({
      ContMenuColor : value,
    });
  }

  async componentDidMount() {
    console.log("calling at initial load");
    this.Auth();
  }
  render() {
    return (
      <GlobalGymInfo.Provider
        value={{
          ...this.state,
          logout: this.logout,
          Auth: this.Auth,
          AuthToken: this.AuthToken,
          handlemenuSelected: this.handlemenuSelected,
          handleHover: this.handleHover,
          handleMenuColor: this.handleMenuColor,
          
        }}
      >
        {this.props.children}
      </GlobalGymInfo.Provider>
    );
  }
}
