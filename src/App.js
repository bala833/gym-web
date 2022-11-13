import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useContext, Suspense } from "react";
import { GlobalGymInfo, GymProvider } from "./context";
import Login from "./components/authentication/Login";
import UserList from "./components/infopage/UserList";
import Page_not_found from "./components/404/PageNotFound";
import UserCreation from "./components/usercreation/UserCreate";
import ProtectedRoute from "./components/authentication/ProtectRoute";
import Profile from "./components/Account/profile";
import Dashboard from "./components/dashbaord";
import Razorpay from "./components/razorpay/razorpay";

function App() {
  const { isAuth } = useContext(GlobalGymInfo);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute
          exact
          path="/home"
          component={Dashboard}
          auth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/user/:id"
          component={UserCreation}
          auth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/user/:id"
          component={UserCreation}
          auth={isAuth}
        />

        <ProtectedRoute exact path="/user" component={UserList} auth={isAuth} />
        <ProtectedRoute
          exact
          path="/account"
          component={Profile}
          auth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/razorpay"
          component={Razorpay}
          auth={isAuth}
        />
        <ProtectedRoute path="*" component={Page_not_found} auth={isAuth} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
