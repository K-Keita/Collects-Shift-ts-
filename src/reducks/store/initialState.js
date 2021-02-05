const initialState = {
  group: {
    groupIcon: "",
    groupId: "",
    groupName: "",
    groupPassword: "",
    groupMembers: [],
  },
  shift: {
    prevShiftList: [],
    shiftList: [],
  },
  users: {
    groupId: "",
    isSignedIn: false,
    role: "",
    management: false,
    shift: [],
    uid: "",
    username: "",
  },
};

export default initialState;
