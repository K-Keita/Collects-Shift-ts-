import React, { FC } from "react";
import Auth from "./Auth";
import { getUserGroupId } from "./reducks/users/selectors";
import { Route, Switch } from "react-router";
import {
  CreateGroupPage,
  EnterGroupPage,
  Home,
  ManagementPage,
  Members,
  RegistrationShift,
  Reset,
  ShiftList,
  SignIn,
  SignUp,
  Top,
} from "./templates/index";
import { useSelector } from "react-redux";

const Router: FC = () => {
  const selector = useSelector((state) => state);
  const groupId = getUserGroupId(selector);

  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/Top"} component={Top} />
      <Route exact path={"/reset"} component={Reset} />
      <Auth>
        {groupId !== "" && (
          <>
            <Route exact path={"/shift"} component={ShiftList} />
            <Route exact path={"/registration"} component={RegistrationShift} />
            <Route exact path={"/management"} component={ManagementPage} />
            <Route exact path={"/list"} component={Members} />
            <Route exact path={"(/)?"} component={Home} />
          </>
        )}
        <Route exact path={"/create"} component={CreateGroupPage} />
        <Route exact path={"/enter"} component={EnterGroupPage} />
      </Auth>
    </Switch>
  );
};

export default Router;
