import React, { FC, Dispatch, SetStateAction } from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dialog: {
    backgroundColor: blueGrey[300],
    border: "solid 1px #eceff1",
    color: blueGrey[50],
    width: 290,
  },
  dialogText: {
    color: blueGrey[50],
    fontWeight: "bold",
    padding: 3,
  },
  dialogTitle: {
    backgroundColor: blueGrey[400],
    borderBottom: "solid 1px #eceff1",
    padding: "8px 3px",
    textAlign: "center",
  },
  dialogButton: {
    backgroundColor: blueGrey[500],
    color: blueGrey[50],
    "&:hover": {
      backgroundColor: blueGrey[700],
    },
  },
});

interface List {
  range: string;
  time: number;
}

interface Week {
  name: List;
  func: Dispatch<SetStateAction<List>>;
  date?: string;
  day?: string;
}

interface Props {
  dateId: string;
  handleClose: () => void;
  open: boolean;
  saveShift: () => void;
  shiftWeek: Week[];
}

const ConfirmDialog: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="title"
      aria-describedby="alert-dialog-description"
    >
      <div className={classes.dialog}>
        <DialogTitle className={classes.dialogTitle} id="title">
          登録します。よろしいですか？
          <span className="side-text">(まだ登録は完了していません)</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.dialogText}
          >
            {props.shiftWeek.map((shift: Week, index: number) => {
              const shiftName =
                shift.name.time === 0 ? "休み" : shift.name.range;
              return (
                <span key={String(index)}>
                  {shift.date}({shift.day}) : {shiftName}
                  <br />
                </span>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.dialogButton} onClick={props.handleClose}>
            キャンセル
          </Button>
          <Button
            autoFocus
            className={classes.dialogButton}
            onClick={props.saveShift}
          >
            登録
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
