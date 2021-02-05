import React, { FC } from "react";
import { PrimaryButton } from "../components/UIkit";
import { signOut } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const SignOut: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="content-button">
      <PrimaryButton
        width={"100%"}
        fullWidth={false}
        label={"ログアウト"}
        onClick={() => dispatch(signOut())}
      />
    </div>
  );
};

export default SignOut;
