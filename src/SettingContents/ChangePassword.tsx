import React, { FC, useCallback, useState } from "react";
import { resetPassword } from "../reducks/users/operations";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";

const ChangePassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          id="reset-email"
          label={"メールアドレス"}
          onChange={inputEmail}
          type={"email"}
          value={email}
        />
      </div>
      <div className="content-button">
        <PrimaryButton
          fullWidth={true}
          width={"100%"}
          label={"変更メールを送る"}
          onClick={() => dispatch(resetPassword(email))}
        />
      </div>
    </>
  );
};

export default ChangePassword;
