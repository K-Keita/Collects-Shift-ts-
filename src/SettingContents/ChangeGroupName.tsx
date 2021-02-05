import React, { FC, ChangeEvent, useCallback, useState } from "react";
import { changeGroupName } from "../reducks/groups/operations";
import { getGroupId } from "../reducks/groups/selectors";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";

const ChangeGroupName: FC = React.memo(() => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector);

  const [groupPassword, setGroupPassword] = useState<string>(""),
    [newGroupName, setNewGroupName] = useState<string>("");

  const inputPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupPassword(event.target.value);
    },
    [setGroupPassword]
  );

  const inputNewGroupName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewGroupName(event.target.value);
    },
    [setNewGroupName]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          id="manage-password"
          label={"管理者パスワード"}
          onChange={inputPassword}
          type={"password"}
          value={groupPassword}
        />
        <TextInput
          id="new-group"
          label={"新しいグループ名"}
          onChange={inputNewGroupName}
          type={"text"}
          value={newGroupName}
        />
      </div>
      <div className="content-button">
        <PrimaryButton
          fullWidth={true}
          width={"100%"}
          label={"変更する"}
          onClick={() =>
            dispatch(changeGroupName(groupId, groupPassword, newGroupName))
          }
        />
      </div>
    </>
  );
});

export default ChangeGroupName;
