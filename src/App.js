import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useContext, Suspense } from "react";
import { GlobalGymInfo, GymProvider } from "./context";
import Login from "./components/authentication/Login";
import UserList from "./components/infopage/UserList";
import Page_not_found from "./components/404/PageNotFound";
import FirstPage from "./components/infopage/FirstPage";
import UserCreation from "./components/usercreation/UserCreate";
import ProtectedRoute from "./components/authentication/ProtectRoute";

function App() {
  const { isAuth } = useContext(GlobalGymInfo);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute
          exact
          path="/user-creation/:id"
          component={UserCreation}
          auth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/update-user/:id"
          component={UserCreation}
          auth={isAuth}
        />

        <ProtectedRoute
          exact
          path="/user-list"
          component={UserList}
          auth={isAuth}
        />
        <ProtectedRoute path="*" component={Page_not_found} auth={isAuth} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
