import React, { ChangeEvent, useCallback, useState } from "react";
import { createGroup } from "../reducks/groups/operations";
import { getUserName, getUserId } from "../reducks/users/selectors";
import { push } from "connected-react-router";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { useDispatch, useSelector } from "react-redux";

const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector),
    username = getUserName(selector);

  const [groupId, setGroupId] = useState(""),
    [groupName, setGroupName] = useState(""),
    [groupPassword, setGroupPassword] = useState("");

  const inputGroupName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );
  const inputGroupId = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupId(event.target.value);
    },
    [setGroupId]
  );
  const inputGroupPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupPassword(event.target.value);
    },
    [setGroupPassword]
  );

  return (
    <div className="main-container">
      <h2>グループ作成</h2>
      <TextInput
        id="groupName"
        label={"グループ名"}
        onChange={inputGroupName}
        type={"text"}
        value={groupName}
      />
      <TextInput
        id="groupId"
        label={"グループID"}
        onChange={inputGroupId}
        type={"text"}
        value={groupId}
      />
      <TextInput
        id="manage-password"
        label={"管理者パスワード"}
        onChange={inputGroupPassword}
        type={"password"}
        value={groupPassword}
      />
      <PrimaryButton
        fullWidth={true}
        label={"登録"}
        onClick={() =>
          dispatch(
            createGroup(groupId, groupName, groupPassword, uid, username)
          )
        }
        width={"70%"}
      />
      <div className="w-border" />
      <PrimaryButton
        fullWidth={true}
        label={"グループに参加"}
        onClick={() => dispatch(push("/enter"))}
        width={"50%"}
      />
    </div>
  );
};

export default CreateGroupPage;
