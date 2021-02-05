import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import LoopIcon from "@material-ui/icons/Loop";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { TimeSelect } from "./index";

const useStyles = makeStyles({
  icon: {
    color: blueGrey[50],
    width: "15%",
  },
});

interface List {
  range: string;
  time: number;
}

interface Props {
  func: Dispatch<SetStateAction<List>>;
  date?: string;
  day?: string;
  timeLine: List;
}

const ToggleShift: FC<Props> = React.memo((props) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false),
    [start, setStart] = useState<string>("10: 00"),
    [end, setEnd] = useState<string>("23: 30");

  const timeArr = [...Array(15)].map((_, i) => i + 9);
  const timeRange: string[] = [];
  timeArr.map((time) => {
    return timeRange.push(`${time}: 00`, `${time}: 30`);
  });

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const handleChangeStart = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setStart(event.target.value);
    },
    [setStart]
  );

  const handleChangeEnd = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEnd(event.target.value);
    },
    [setEnd]
  );

  useEffect(() => {
    const i1 = timeRange.indexOf(start);
    const i2 = timeRange.indexOf(end);
    if (!open) {
      props.func({ range: "休み", time: 0 });
    } else {
      if (i1 > i2) {
        alert("範囲に誤りがあります");
        setStart("10: 00");
        setEnd("23: 00");
      } else {
        props.func({ range: `${start}-${end}`, time: i2 - i1 });
      }
    }
  }, [start, end, open]);

  return (
    <div className="d-flex f-between time-field">
      <p className="time-field_date">
        {props.date}
        <span>(</span>
        {props.day}
        <span>)</span>
      </p>
      {open ? (
        <div className="d-flex">
          <TimeSelect
            arr={timeRange}
            handleChange={handleChangeStart}
            label={"start"}
            value={start}
          />
          <p className="time-field_line">ー</p>
          <TimeSelect
            arr={timeRange}
            handleChange={handleChangeEnd}
            label={"end"}
            value={end}
          />
        </div>
      ) : (
        <p className="time-field_label">休み</p>
      )}
      <IconButton onClick={toggleOpen} className={classes.icon}>
        <LoopIcon />
      </IconButton>
    </div>
  );
});

export default ToggleShift;
