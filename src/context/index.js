import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, Context, createContext } from "react";
import API from "./API";

export const GlobalGymInfo = createContext();

export class GymProvider extends Component {
  state = {
    GlobalGymName: "Gym",
    isAuth: false,
    token: "",
  };

  Auth = (token_) => {
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
        }}
      >
        {this.props.children}
      </GlobalGymInfo.Provider>
    );
  }
}
