import React, { FC } from "react";
import topImage from "../images/topImage.jpg";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const Top: FC = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ overflow: "hidden" }}>
      <div>
        <img src={topImage} alt="mainTitle" className="image-box" />
      </div>
      <div className="top-title">
        <p>シンプルなシフト管理アプリ</p>
        <h1>
          Collect
          <br />
          Shifts
        </h1>
      </div>
      <div className="top-container">
        <p onClick={() => dispatch(push("/signup"))}>アカウント登録</p>
        <p onClick={() => dispatch(push("/signin"))}>ログイン</p>
      </div>
    </div>
  );
};

export default Top;
