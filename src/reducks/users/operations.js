import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";
import { signInAction, signOutAction } from "./actions";
import { groupIn } from "../groups/operations";
import { fetchShifts } from "../shifts/operations";
import { changeMemberName } from "../groups/operations";
import { groupOutAction } from "../groups/actions";

const usersRef = db.collection("users");
const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;
const sun = d.getDay() === 0 ? 7 : d.getDay();
const s = d.getDate() + (14 - sun + 1);
const firstDate = new Date(y, m - 1, s);
const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;

export const isValidEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

//ユーザー名の変更
export const changeName = (groupId, uid, username) => {
  if (username === "") {
    alert("必須項目が未入力です");
    return false;
  }
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await usersRef.doc(uid).get();
    const data = snapshot.data();

    const updateData = {
      username: username,
      updated_at: timestamp,
    };

    dispatch(
      signInAction({
        groupId: data.groupId,
        isSignIn: true,
        role: data.role,
        uid: uid,
        username: username,
      })
    );

    usersRef
      .doc(uid)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(changeMemberName(groupId, uid, username));
      });
  };
};

//グループIDの削除
export const deleteGroupId = (groupId, uid) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await usersRef.doc(uid).get();
    const data = snapshot.data();

    if (data.groupId !== groupId) {
      return false;
    }

    const updateData = {
      groupId: "",
      updated_at: timestamp,
    };

    usersRef
      .doc(uid)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(push("/top"));
      });

    auth.signOut().then(() => {
      dispatch(signOutAction());
    });
  };
};

//ログイン状態の確認、情報の取得
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;

        const snapshot = usersRef.doc(uid).get();

        const data = (await snapshot).data();

        if (data) {
          const groupId = await data.groupId;

          dispatch(
            signInAction({
              groupId: groupId,
              role: data.role,
              isSignIn: true,
              uid: uid,
              username: data.username,
            })
          );

          if (groupId === "") {
            dispatch(push("/enter"));
          } else {
            dispatch(fetchShifts(dateId, groupId));
            dispatch(groupIn(groupId));
          }
        }
      } else {
        dispatch(push("/top"));
      }
    });
  };
};

//パスワードのリセットメールを送る
export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です");
      return false;
    } else if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。");
      return false;
    }
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          "入力されたアドレスにパスワードリセット用のメールをお送りしました。"
        );
        dispatch(push("/signin"));
      })
      .catch(() => {
        alert("パスワードリセットに失敗しました。通信状況をご確認ください");
      });
  };
};

//サインイン
export const signIn = (email, password) => {
  if (email === "" || password === "") {
    alert("必須項目が未入力です");
    return false;
  } else if (!isValidEmailFormat(email)) {
    alert("メールアドレスの形式が不正です。");
    return false;
  }

  return async (dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;

          usersRef
            .doc(uid)
            .get()
            .then((snapshot) => {
              const data = snapshot.data();

              dispatch(
                signInAction({
                  groupId: data.groupId,
                  isSignIn: true,
                  role: data.role,
                  uid: uid,
                  username: data.username,
                })
              );

              if (data.groupId === "") {
                dispatch(push("/enter"));
              } else {
                dispatch(groupIn(data.groupId));
                dispatch(fetchShifts(dateId, data.groupId));
                dispatch(push("/"));
              }
            });
        } else {
          throw new Error("ユーザー情報を取得でしません");
        }
      })
      .catch((error) => {
        alert("メールアドレスとパスワードが一致しません");
        throw new Error(error);
      });
  };
};

//サインアップ
export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください");
      return false;
    }

    if (String(password).length < 6) {
      alert("パスワードの文字数が足りません");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            groupId: "",
            role: "customer",
            updated_at: timestamp,
            username: username,
            uid: uid,
          };

          usersRef
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/enter"));
            });
        }
      });
  };
};

//グループIDの登録
export const saveGroupId = (groupId, uid, username) => {
  return async (dispatch) => {
    const data = {
      groupId: groupId,
    };

    dispatch(
      signInAction({
        groupId: groupId,
        isSignIn: true,
        role: data.role,
        uid: uid,
        username: username,
      })
    );

    usersRef
      .doc(uid)
      .set(data, { merge: true })
      .then(() => {
        alert("グループに登録しました");
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

//サインアウト
export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(groupOutAction());
      dispatch(push("/top"));
    });
  };
};
