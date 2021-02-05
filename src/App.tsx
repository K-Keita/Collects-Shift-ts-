import React, { FC } from "react";
import Router from "./Router";
import "./styles/App.scss";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { getIsSignedIn } from "./reducks/users/selectors";
import { getGroupId } from "./reducks/groups/selectors";
import { Footer } from "./footer/index";
import { Header } from "./header/index";

const App: FC = () => {
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const groupId = getGroupId(selector);

  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <Router />
      </main>
      {isSignedIn && groupId !== "" && <Footer />}
    </div>
  );
};

export default App;
