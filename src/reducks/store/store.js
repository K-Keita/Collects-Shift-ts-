import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import { GroupsReducer } from "../groups/reducers";
import { ShiftsListReducer } from "../shifts/reducers";
import { UsersReducer } from "../users/reducers";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      groups: GroupsReducer,
      shifts: ShiftsListReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
