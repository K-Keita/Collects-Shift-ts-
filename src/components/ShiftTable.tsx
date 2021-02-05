import React, { FC } from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bodyCell_a: {
    background: blueGrey[200],
    border: "solid 1px #455a64",
    color: "#263238",
    padding: "12px 0px",
    textAlign: "center",
  },
  bodyCell_b: {
    background: blueGrey[300],
    border: "solid 1px #455a64",
    color: "#263238",
    padding: "12px 0px",
    textAlign: "center",
  },
  headCell: {
    background: blueGrey[500],
    border: "solid 1px #455a64",
    color: blueGrey[50],
    fontSize: 16,
    fontWeight: "bold",
    padding: "12px 0px",
    textAlign: "center",
  },
  table: {
    border: "solid 2px #fff",
    borderRadius: 10,
    margin: "0 1% 0 1%",
    maxWidth: 850,
    minWidth: 730,
  },
});

interface List {
  range: string;
  time: number;
}

interface Shift {
  id: string;
  list: List[];
  name: string;
}

interface Props {
  shiftWeek: string[];
  shiftList: Shift[];
}

const ShiftTable: FC<Props> = React.memo((props) => {
  const classes = useStyles();

  const timeNum = [...Array(7)].map(() => 0);

  props.shiftList.map((shift) => {
    return shift.list.map((value, index): number => {
      return (timeNum[index] = timeNum[index] + value.time);
    });
  });

  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell width="110px" className={classes.headCell}>
            名前
          </TableCell>
          {props.shiftWeek.map(
            (value): JSX.Element => {
              return (
                <TableCell
                  width="85px"
                  key={value}
                  className={classes.headCell}
                >
                  {value}
                </TableCell>
              );
            }
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.shiftList.map((shift, index) => {
          const a = index % 2 === 1 ? classes.bodyCell_a : classes.bodyCell_b;
          return (
            <TableRow key={String(index)}>
              <TableCell
                className={a}
                component="th"
                scope="row"
                style={{ fontWeight: "bold" }}
              >
                {shift.name}
              </TableCell>
              {shift.list.map((value, index) => {
                if (value.range === "休み") {
                  return (
                    <TableCell
                      key={String(index)}
                      className={a}
                      style={{ color: "#37474f" }}
                    >
                      {value.range}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={String(index)} className={a}>
                      {value.range}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          );
        })}
        <TableRow>
          <TableCell width="110px" className={classes.headCell}>
            時間数
          </TableCell>
          {timeNum.map((value, index) => {
            return (
              <TableCell
                width="85px"
                key={String(index)}
                className={classes.headCell}
              >
                {value / 2} h
              </TableCell>
            );
          })}
        </TableRow>
      </TableBody>
    </Table>
  );
});

export default ShiftTable;
