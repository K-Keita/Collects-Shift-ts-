import React, { FC, ChangeEvent, useCallback, useState } from "react";
import topImage from "../images/topImage.jpg";
import { resetPassword } from "../reducks/users/operations";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const Reset: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const inputEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <div className="main-container">
      <div>
        <img src={topImage} alt="mainTitle" className="image-box_a" />
      </div>
      <h2>パスワードのリセット</h2>
      <TextInput
        label={"メールアドレス"}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <PrimaryButton
        label={"リセット用のメールを送る"}
        width={"70%"}
        onClick={() => dispatch(resetPassword(email))}
        fullWidth={true}
      />
      <div className="medium-space" />
      <div className="w-border" />
      <PrimaryButton
        width={"50%"}
        fullWidth={true}
        label={"ログイン画面に戻る"}
        onClick={() => dispatch(push("/signin"))}
      />
    </div>
  );
};

export default Reset;
