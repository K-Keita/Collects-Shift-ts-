import React, { FC } from "react";
import { exitGroup } from "../reducks/groups/operations";
import { getGroupId } from "../reducks/groups/selectors";
import { getUserId, getUserName } from "../reducks/users/selectors";
import { PrimaryButton } from "../components/UIkit/index";
import { useDispatch, useSelector } from "react-redux";

const ExitGroup: FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector),
    uid = getUserId(selector),
    username = getUserName(selector);

  return (
    <div className="content-button">
      <PrimaryButton
        fullWidth={true}
        width={"100%"}
        label={"退会する"}
        onClick={() => dispatch(exitGroup(groupId, uid, username))}
      />
    </div>
  );
};

export default ExitGroup;
