import initialState from "../store/initialState";
import * as Actions from "./actions";
import { ActionType } from "./types";

export const GroupsReducer = (
  state = initialState.group,
  action: ActionType
) => {
  switch (action.type) {
    case Actions.GROUP_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.GROUP_OUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
