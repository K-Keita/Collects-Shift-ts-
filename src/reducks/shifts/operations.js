import { db, FirebaseTimestamp } from "../../firebase/index";
import { fetchShiftsListAction } from "./actions";

const groupsRef = db.collection("groups");

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;
const sun = d.getDay() === 0 ? 7 : d.getDay();
const s = d.getDate() + (14 - sun + 1);
const firstDate = new Date(y, m - 1, s);
const prevFirstDate = new Date(y, m - 1, s - 7);
const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;
const prevDateId = `${prevFirstDate.getFullYear()}${prevFirstDate.getMonth()}${prevFirstDate.getDate()}`;

//シフトに登録した名前の変更
export const changeShiftName = (groupId, uid, username) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const doc = await groupsRef
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();

    const data = doc.data();

    const shiftList = data.shiftList;
    const prevShiftList = data.prevShiftList;

    if (shiftList.length > 0) {
      shiftList.forEach((value) => {
        if (value.id === uid) {
          value.name = username;
        }
      });
    }

    if (prevShiftList.length > 0) {
      prevShiftList.forEach((value) => {
        if (value.id === uid) {
          value.name = username;
        }
      });
    }

    const updateData = {
      prevShiftList: prevShiftList,
      shiftList: shiftList,
      updated_at: timestamp,
    };

    groupsRef
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(
          fetchShiftsListAction({
            shiftList: shiftList,
            prevShiftList: prevShiftList,
          })
        );
        alert("変更しました");
      });
  };
};

// シフトの削除
export const deleteShift = (groupId, username) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await groupsRef
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();

    const data = snapshot.data();
    const shiftList = data.shiftList;
    const updateShift = [];

    shiftList.map((value) => {
      if (value.name === username) {
        return false;
      }
      return updateShift.push(value);
    });

    const updateData = {
      shiftList: updateShift,
      updated_at: timestamp,
    };

    groupsRef
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .set(updateData, { merge: true })
      .then(() => {
        dispatch(
          fetchShiftsListAction({
            prevShiftList: [],
            shiftList: [],
          })
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

//シフトリストの呼び出し
export const fetchShifts = (dateId, groupId) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await groupsRef
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();

    if (!snapshot.exists) {
      const prevSnapshot = await db
        .collection("groups")
        .doc(groupId)
        .collection("shiftsList")
        .doc(prevDateId)
        .get();

      const prevShiftData = [];

      if (prevSnapshot.exists) {
        const prevData = prevSnapshot.data();
        prevData.shiftList.forEach((value) => {
          prevShiftData.push(value);
        });
      }

      const data = {
        created_at: timestamp,
        prevShiftList: prevShiftData,
        shiftList: [],
        updated_at: timestamp,
      };

      groupsRef
        .doc(groupId)
        .collection("shiftsList")
        .doc(dateId)
        .set(data, { merge: true })
        .then(() => {
          dispatch(
            fetchShiftsListAction({
              prevShiftList: prevShiftData,
              shiftList: [],
            })
          );
        });
    } else {
      const data = snapshot.data();

      dispatch(
        fetchShiftsListAction({
          prevShiftList: data.prevShiftList,
          shiftList: data.shiftList,
        })
      );
    }
  };
};

//シフト登録
export const saveShifts = (groupId, shift, uid, username) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const snapshot = await groupsRef
      .doc(groupId)
      .collection("shiftsList")
      .doc(dateId)
      .get();
    const newData = {
      list: shift,
      name: username,
      id: uid,
    };

    if (snapshot.exists) {
      const data = snapshot.data();
      const shiftList = data.shiftList;

      const arr = [];
      shiftList.map((value) => {
        return arr.push(value.name);
      });
      const i = arr.indexOf(newData.name);
      if (i !== -1) {
        if (!window.confirm("既に登録されていますが、変更しますか？")) {
          return false;
        }
        shiftList[i] = newData;
      } else {
        shiftList.push(newData);
      }

      const updateData = {
        shiftList: shiftList,
        updated_at: timestamp,
      };

      groupsRef
        .doc(groupId)
        .collection("shiftsList")
        .doc(dateId)
        .set(updateData, { merge: true })
        .then(() => {
          dispatch(
            fetchShiftsListAction({
              prevShiftList: data.prevShiftList,
              shiftList: shiftList,
            })
          );
          alert("登録しました");
        });
    } else {
      const prevSnapshot = await groupsRef
        .doc(groupId)
        .collection("shiftsList")
        .doc(prevDateId)
        .get();

      const prevShiftData = [];
      if (prevSnapshot.exists) {
        const data = prevSnapshot.data();
        const prevShiftData = data.prevShiftList;
        prevShiftData.push(data);
      }

      const initializeDate = {
        created_at: timestamp,
        prevShiftList: prevShiftData,
        shiftList: [newData],
        updated_at: timestamp,
      };

      groupsRef
        .doc(groupId)
        .collection("shiftsList")
        .doc(dateId)
        .set(initializeDate)
        .then(() => {
          dispatch(
            fetchShiftsListAction({
              prevShiftList: prevShiftData,
              shiftList: [newData],
            })
          );
          alert("登録しました");
        });
    }
  };
};
