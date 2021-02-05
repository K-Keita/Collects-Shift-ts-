import React, { FC } from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  child: {
    padding: "5px 10px",
  },
  root: {
    backgroundColor: blueGrey[400],
    border: "solid 2px #cfd8dc",
    borderRadius: 3,
    margin: "5px auto 25px",
    maxWidth: 360,
    padding: 0,
    width: "90%",
  },
  title: {
    backgroundColor: blueGrey[500],
    borderBottom: "solid 1px #cfd8dc",
    fontSize: 18,
    fontWeight: "bold",
    margin: "0 auto",
    padding: 3,
    textAlign: "center",
  },
});

interface Props {
  memberList: string[];
  title: string;
}

const UsersList: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <p className={classes.title}>
        {props.title}　{props.memberList.length}人
      </p>
      {props.memberList.map((member, index) => {
        return (
          <ListItem key={String(index)} className={classes.child} divider>
            <ListItemText primary={member} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default UsersList;
