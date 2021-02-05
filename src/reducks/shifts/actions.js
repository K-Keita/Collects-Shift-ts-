export const FETCH_SHIFTLIST = "FETCH_SHIFTLIST";
export const fetchShiftsListAction = (shiftState) => {
  return {
    type: "FETCH_SHIFTLIST",
    payload: {
      prevShiftList: shiftState.prevShiftList,
      shiftList: shiftState.shiftList,
    },
  };
};
