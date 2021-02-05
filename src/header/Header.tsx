import React, { FC } from "react";
import AppBar from "@material-ui/core/AppBar";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  getGroupIcon,
  getGroupId,
  getGroupName,
} from "../reducks/groups/selectors";
import { ImagePreview } from "../components";
import { makeStyles } from "@material-ui/core/styles";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../reducks/users/selectors";

const useStyles = makeStyles({
  headTitle: {
    color: blueGrey[50],
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: 10,
    maxWidth: 210,
  },
  mainTitle: {
    background: blueGrey[300],
    border: "solid 1px #fff",
    marginLeft: "-10px",
    opacity: 0.8,
    padding: 6,
    textAlign: "center",
  },
  topTitle: {
    color: blueGrey[50],
    cursor: "pointer",
    margin: "0 10px 0 auto",
  },
  root: {
    background: blueGrey[400],
    bottom: "auto",
    border: "solid 1px #607d8b",
    margin: 0,
    padding: 0,
    top: 0,
    width: "100%",
  },
});

const Header: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const groupIcon = getGroupIcon(selector),
    groupId = getGroupId(selector),
    groupName = getGroupName(selector),
    isSignedIn = getIsSignedIn(selector);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar style={{ minWidth: "350px" }}>
        <div className={classes.mainTitle}>
          Collect
          <br />
          Shifts
        </div>
        {groupId !== "" && isSignedIn ? (
          <>
            <Typography variant="h6" className={classes.headTitle}>
              {groupName}
            </Typography>
            {groupIcon !== "" && <ImagePreview path={groupIcon.path} />}
          </>
        ) : isSignedIn ? (
          <>
            <p
              className={classes.headTitle}
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(push("/enter"))}
            >
              グループ
            </p>
            <p
              className={classes.headTitle}
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(push("/top"))}
            >
              TopPage
            </p>
          </>
        ) : (
          window.location.pathname !== "/top" && (
            <p
              className={classes.headTitle}
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(push("/top"))}
            >
              TopPage
            </p>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
