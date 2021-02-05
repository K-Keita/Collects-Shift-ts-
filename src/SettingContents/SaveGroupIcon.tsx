import React, { useCallback, useEffect, useState } from "react";
import { getGroupIcon, getGroupId } from "../reducks/groups/selectors";
import { ImageArea } from "../components/index";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { saveGroupIcon } from "../reducks/groups/operations";
import { useSelector, useDispatch } from "react-redux";

interface Image {
  id: string;
  path: string;
}

const SaveGroupIcon = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupIcon = getGroupIcon(selector),
    groupId = getGroupId(selector);

  const [images, setImages] = useState<Image>({ id: "", path: "" }),
    [groupPassword, setGroupPassword] = useState<string>("");

  useEffect(() => {
    setImages(groupIcon);
  }, [groupIcon]);

  const inputGroupPassword = useCallback(
    (event) => {
      setGroupPassword(event.target.value);
    },
    [setGroupPassword]
  );

  return (
    <>
      <div className="content-form">
        <TextInput
          id={"manage-password2"}
          label={"管理者パスワード"}
          onChange={inputGroupPassword}
          type={"password"}
          value={groupPassword}
        />
        <ImageArea images={images} setImages={setImages} />
      </div>
      <div className="content-button">
        <PrimaryButton
          width={"100%"}
          fullWidth={false}
          label={"登録する"}
          onClick={() =>
            dispatch(saveGroupIcon(groupId, groupPassword, images))
          }
        />
      </div>
    </>
  );
};

export default SaveGroupIcon;
