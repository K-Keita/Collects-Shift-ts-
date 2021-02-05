import { createSelector } from "reselect";
import { StoreState } from "./types";

declare module "react-redux" {
  interface DefaultRootState extends StoreState {}
}

const groupsSelector = (state: StoreState) => state.groups;

export const getGroupIcon = createSelector(
  [groupsSelector],
  (state) => state.groupIcon
);

export const getGroupId = createSelector(
  [groupsSelector],
  (state) => state.groupId
);

export const getGroupName = createSelector(
  [groupsSelector],
  (state) => state.groupName
);

export const getGroupMembers = createSelector(
  [groupsSelector],
  (state) => state.groupMembers
);
