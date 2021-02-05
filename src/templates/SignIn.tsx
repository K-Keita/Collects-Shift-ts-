import React, { FC, ChangeEvent, useCallback, useState } from "react";
import topImage from "../images/topImage.jpg";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { push } from "connected-react-router";
import { signIn } from "../reducks/users/operations";

const SignIn: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>(""),
    [password, setPassword] = useState<string>("");

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

  return (
    <div className="main-container">
      <div>
        <img src={topImage} alt="mainTitle" className="image-box_a" />
      </div>
      <h2>サインイン</h2>
      <TextInput
        fullWidth={true}
        label={"email"}
        onChange={inputEmail}
        type={"email"}
        value={email}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        onChange={inputPassword}
        type={"password"}
        value={password}
      />
      <PrimaryButton
        fullWidth={true}
        label={"サインイン"}
        onClick={() => dispatch(signIn(email, password))}
        width={"70%"}
      />
      <div className="w-border" />
      <PrimaryButton
        fullWidth={true}
        label="アカウント登録"
        onClick={() => dispatch(push("/signup"))}
        width={"50%"}
      />
      <div className="small-space" />
      <PrimaryButton
        fullWidth={true}
        label={"パスワードを忘れた方"}
        onClick={() => dispatch(push("/reset"))}
        width={"50%"}
      />
    </div>
  );
};

export default SignIn;
