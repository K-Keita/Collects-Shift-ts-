import React, { FC } from "react";
import AppBar from "@material-ui/core/AppBar";
import blueGrey from "@material-ui/core/colors/blueGrey";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import Toolbar from "@material-ui/core/Toolbar";
import { getIsSignedIn } from "../reducks/users/selectors";
import { getGroupId } from "../reducks/groups/selectors";
import { makeStyles } from "@material-ui/core/styles";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  appBar: {
    background: blueGrey[400],
    borderTop: "solid 2px #607d8b",
    bottom: 0,
    boxSizing: "border-box",
    margin: 0,
    top: "auto",
    width: "100%",
  },
  icon: {
    width: "100%",
  },
  iconBox: {
    borderRight: "inset 1px #eceff1",
    margin: 0,
    width: "20%",
  },
  iconText: {
    fontSize: 10,
    margin: "-16px 0 0 0",
    textAlign: "center",
  },
  toolBar: {
    padding: 0,
    width: "100%",
  },
});

const Footer: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector),
    isSignedIn = getIsSignedIn(selector);

  const templatePage = [
    { icon: <PeopleIcon />, path: "/list", text: "メンバー" },
    { icon: <PlaylistAddIcon />, path: "/registration", text: "シフト登録" },
    { icon: <HomeIcon />, path: "/", text: "ホーム" },
    { icon: <ListAltIcon />, path: "/shift", text: "シフト一覧" },
    { icon: <SettingsIcon />, path: "/management", text: "設定" },
  ];

  const linkPage = (path: string) => {
    dispatch(push(path));
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        {isSignedIn &&
          groupId !== "" &&
          templatePage.map((page, index) => {
            return (
              <div key={String(index)} className={classes.iconBox}>
                <IconButton
                  className={classes.icon}
                  color="inherit"
                  key={String(index)}
                  onClick={() => linkPage(page.path)}
                >
                  {page.icon}
                </IconButton>
                <p className={classes.iconText}>{page.text}</p>
              </div>
            );
          })}
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
