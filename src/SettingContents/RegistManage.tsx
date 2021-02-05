import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { getGroupId } from "../reducks/groups/selectors";
import { getUserId } from "../reducks/users/selectors";
import { registManage } from "../reducks/groups/operations";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";

const RegistManage: FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector),
    uid = getUserId(selector);

  const [groupPassword, setGroupPassword] = useState("");

  const inputGroupPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupPassword(event.target.value);
    },
    [setGroupPassword]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          id="password"
          label={"管理者パスワード"}
          onChange={inputGroupPassword}
          type={"text"}
          value={groupPassword}
        />
      </div>
      <div className="content-button">
        <PrimaryButton
          fullWidth={true}
          width={"100%"}
          label={"登録する"}
          onClick={() => dispatch(registManage(groupId, groupPassword, uid))}
        />
      </div>
    </>
  );
};

export default RegistManage;
