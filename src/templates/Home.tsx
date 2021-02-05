import "react-calendar/dist/Calendar.css";
// import topImage from "../images/topImage.jpg";
import React, { FC, useState } from "react";
import Calendar from "react-calendar";
import { getUserName } from "../reducks/users/selectors";
import { getGroupName } from "../reducks/groups/selectors";
import { useSelector } from "react-redux";

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const Home: FC = () => {
  const [value, onChange] = useState(new Date());
  const selector = useSelector((state) => state);
  const groupName = getGroupName(selector),
    username = getUserName(selector);

  const sun = d.getDay() === 0 ? 7 : d.getDay();
  const s = d.getDate() + (14 - sun + 1);
  const firstDate = new Date(y, m - 1, s);
  const finishDate = new Date(y, m - 1, s + 6);
  const deadline = new Date(y, m - 1, s - 7 - 1);

  const startDate = firstDate.getMonth() + 1 + "/" + firstDate.getDate();
  const endDate = finishDate.getMonth() + 1 + "/" + finishDate.getDate();
  const deadlineDate = deadline.getMonth() + 1 + "/" + deadline.getDate();
  const maxDate = new Date(y, m + 2, 1);

  return (
    <div className="main-container">
      {/* <div>
        <img src={topImage} alt="mainTitle" className="image-box_b"/>
      </div> */}
      <h2 className="main-title">Home</h2>
      <div className="calendar-container">
        <Calendar
          locale="ja-JP"
          maxDate={maxDate}
          minDate={d}
          next2Label={null}
          onChange={() => onChange}
          onClickDay={() => console.log(value.getDate())}
          prev2AriaLabel={"null"}
          prev2Label={null}
          value={value}
        />
      </div>
      <div className="medium-space" />
      <h3>・名前　　　:　{username}</h3>
      <h3>・グループ　:　{groupName}</h3>
      <h3>
        ・シフト範囲:　{startDate}〜{endDate}
      </h3>
      <h3>・締め切り　:　{deadlineDate}</h3>
    </div>
  );
};

export default Home;
