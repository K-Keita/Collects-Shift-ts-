import React, { FC, ChangeEvent, useCallback, useState } from "react";
import { enterGroup } from "../reducks/groups/operations";
import { getUserName, getUserId } from "../reducks/users/selectors";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

const EnterGroupPage: FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector),
    username = getUserName(selector);

  const [groupId, setGroupId] = useState(""),
    [groupName, setGroupName] = useState("");

  const inputGroupId = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupId(event.target.value);
    },
    [setGroupId]
  );

  const inputGroupName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );

  return (
    <div className="main-container">
      <h2>グループに入る</h2>
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
      <PrimaryButton
        fullWidth={true}
        label={"参加"}
        onClick={() => dispatch(enterGroup(groupId, groupName, uid, username))}
        width={"70%"}
      />
      <div className="medium-space w-border" />
      <PrimaryButton
        fullWidth={true}
        label={"グループを作成"}
        onClick={() => dispatch(push("/create"))}
        width={"50%"}
      />
    </div>
  );
};

export default EnterGroupPage;
