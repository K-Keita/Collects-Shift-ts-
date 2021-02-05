import React, { FC, Dispatch, useState, SetStateAction } from "react";
import {
  ConfirmDialog,
  PrimaryButton,
  ToggleShift,
} from "../components/UIkit/index";
import { getGroupId } from "../reducks/groups/selectors";
import { getUserName, getUserId } from "../reducks/users/selectors";
import { saveShifts } from "../reducks/shifts/operations";
import { useDispatch, useSelector } from "react-redux";

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

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const RegistrationShift: FC = () => {
  const sun = d.getDay() === 0 ? 7 : d.getDay();
  const s = d.getDate() + (14 - sun + 1);
  const firstDate = new Date(y, m - 1, s);
  const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector),
    uid = getUserId(selector),
    username = getUserName(selector);

  const [open, setOpen] = useState<boolean>(false),
    [monday, setMonday] = useState<List>({ range: "", time: 0 }),
    [tuesday, setTuesday] = useState<List>({ range: "", time: 0 }),
    [wednesday, setWednesday] = useState<List>({ range: "", time: 0 }),
    [thursday, setThursday] = useState<List>({ range: "", time: 0 }),
    [friday, setFriday] = useState<List>({ range: "", time: 0 }),
    [saturday, setSaturday] = useState<List>({ range: "", time: 0 }),
    [sunday, setSunday] = useState<List>({ range: "", time: 0 });

  const shiftWeek: Week[] = [
    { func: setMonday, name: monday },
    { func: setTuesday, name: tuesday },
    { func: setWednesday, name: wednesday },
    { func: setThursday, name: thursday },
    { func: setFriday, name: friday },
    { func: setSaturday, name: saturday },
    { func: setSunday, name: sunday },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const enterShift = () => {
    const shiftArr: List[] = [];
    shiftWeek.map((shift) => {
      return shiftArr.push({ range: shift.name.range, time: shift.name.time });
    });

    dispatch(saveShifts(groupId, shiftArr, uid, username));
    setOpen(false);
  };

  for (var i = 0; i < 7; i++) {
    const shiftDate = firstDate.getDate();
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][
      firstDate.getDay()
    ];

    firstDate.setDate(firstDate.getDate() + 1);

    shiftWeek[i].date = String(shiftDate);
    shiftWeek[i].day = shiftDay;
  }

  return (
    <div className="main-container">
      <h3 className="sub-label">＜シフト登録＞</h3>
      <div className="sub-border">
        <div className="time-field_title">
          {shiftWeek[0].date}日　〜　{shiftWeek[6].date}日
        </div>
        {shiftWeek.map((value: Week, index) => {
          return (
            <ToggleShift
              date={value.date}
              day={value.day}
              func={value.func}
              key={index}
              timeLine={value.name}
            />
          );
        })}
      </div>
      <div className="medium-space" />
      <PrimaryButton
        fullWidth={true}
        label={"確認"}
        onClick={handleClickOpen}
        width={"50%"}
      />
      <div>
        <ConfirmDialog
          dateId={dateId}
          handleClose={handleClose}
          open={open}
          saveShift={enterShift}
          shiftWeek={shiftWeek}
        />
      </div>
    </div>
  );
};

export default RegistrationShift;
