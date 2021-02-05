import { createSelector } from "reselect";

const shiftsSelector = (state) => state.shifts;

export const getPrevShiftList = createSelector(
  [shiftsSelector],
  (state) => state.prevShiftList
);

export const getShiftList = createSelector(
  [shiftsSelector],
  (state) => state.shiftList
);
