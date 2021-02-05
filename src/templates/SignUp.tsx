import React, { FC, useCallback, ChangeEvent, useState } from "react";
import topImage from "../images/topImage.jpg";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { push } from "connected-react-router";
import { signUp } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const CreateGroupPage: FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>(""),
    [email, setEmail] = useState<string>(""),
    [password, setPassword] = useState<string>(""),
    [confirmPassword, setConfirmPassword] = useState<string>("");

  const inputUsername = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setUsername(event.target.value);
    },
    [setUsername]
  );
  const inputEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="main-container">
      <div>
        <img src={topImage} alt="mainTitle" className="image-box_a" />
      </div>
      <h2>アカウント登録</h2>
      <TextInput
        label={"ユーザー名"}
        onChange={inputUsername}
        type={"text"}
        id="text"
        value={username}
      />
      <TextInput
        label={"メールアドレス"}
        onChange={inputEmail}
        id="email"
        type={"email"}
        value={email}
      />
      <TextInput
        label={"パスワード(6文字以上)"}
        onChange={inputPassword}
        id="password"
        type={"password"}
        value={password}
      />
      <TextInput
        label={"パスワード(確認用)"}
        onChange={inputConfirmPassword}
        id="confirmPassword"
        type={"password"}
        value={confirmPassword}
      />
      <div className="medium-space" />
      <PrimaryButton
        fullWidth={true}
        label={"登録"}
        onClick={() =>
          dispatch(signUp(username, email, password, confirmPassword))
        }
        width={"70%"}
      />
      <div className="w-border" />
      <PrimaryButton
        fullWidth={true}
        label={"アカウントをお持ちの方"}
        onClick={() => dispatch(push("/signin"))}
        width={"55%"}
      />
    </div>
  );
};

export default CreateGroupPage;
