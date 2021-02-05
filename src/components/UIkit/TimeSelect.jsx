import React, { FC, ChangeEvent } from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dropdownStyle: {
    maxHeight: 250,
    border: "solid 1px #fff",
    color: blueGrey[50],
    backgroundColor: blueGrey[400],
  },
  formControl: {
    margin: 0,
    width: "55%",
    color: blueGrey[50],
  },
  select: {
    color: blueGrey[50],
    width: 70,
  },
});

interface Props {
  arr: string[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
}

const TimeSelect: FC<Props> = React.memo((props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-label">{props.label}</InputLabel>
      <Select
        className={classes.select}
        id="select"
        labelId="select-label"
        onChange={props.handleChange}
        value={props.value}
        MenuProps={{
          anchorOrigin: {
            horizontal: "left",
            vertical: "bottom",
          },
          getContentAnchorEl: null,
          classes: {
            paper: classes.dropdownStyle,
          },
        }}
      >
        {props.arr.map((value, index) => {
          return (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
});

export default TimeSelect;
