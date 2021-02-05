export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      groupId: userState.groupId,
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      icon: "",
      isSignedIn: false,
      role: "",
      uid: "",
      username: "",
    },
  };
};
