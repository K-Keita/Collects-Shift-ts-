import React from "react";
import { getGroupMembers } from "../reducks/groups/selectors";
import { getShiftList } from "../reducks/shifts/selectors";
import { UsersList } from "../components/UIkit";
import { useSelector } from "react-redux";

interface Arr {
  name: string;
  id: string;
  manage?: string;
}

const getName = (arr: Arr[], newArr: string[]): void => {
  arr.map((value) => {
    return newArr.push(value.name);
  });
};

const getManage = (arr: Arr[], newArr: string[]): void => {
  arr.map((value) => {
    if (value.manage) {
      return newArr.push(value.name);
    }
  });
};

const Members = () => {
  const selector = useSelector((state) => state);
  const groupMembers = getGroupMembers(selector),
    shiftList = getShiftList(selector);

  const member: string[] = [];
  const shift: string[] = [];
  const manager: string[] = [];

  getName(groupMembers, member);
  getName(shiftList, shift);
  getManage(groupMembers, manager);

  const handInShift = [...member].filter((value) => shift.includes(value));

  const notHandInShift = [...member, ...shift].filter(
    (value) =>
      (!member.includes(value) || !shift.includes(value)) &&
      !manager.includes(value)
  );

  return (
    <div className="main-container">
      <h3 className="sub-label">＜メンバー: {member.length}人＞</h3>
      <UsersList memberList={manager} title={"管理者"} />
      <UsersList memberList={handInShift} title={"提出者"} />
      <UsersList memberList={notHandInShift} title={"未提出者"} />
    </div>
  );
};

export default Members;
