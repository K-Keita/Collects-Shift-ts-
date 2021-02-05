import React, { FC, Dispatch, SetStateAction } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ImagePreview from "./ImagePreview";
import { IconButton, makeStyles } from "@material-ui/core";
import { NoImageArea } from "./index";
import { storage } from "../firebase/index";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

interface Image {
  id: string;
  path: string;
}

interface Props {
  images: Image;
  setImages: Dispatch<SetStateAction<Image>>;
}

const ImageArea: FC<Props> = (props) => {
  const classes = useStyles();

  //調べる
  const uploadImage = (event: any) => {
    const file = event.target.files;
    const imgWidth = "100px";
    const imgHeight = "100px";

    file.width = imgWidth;
    file.height = imgHeight;
    let blob = new Blob(file, { type: "image/jpeg" });

    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    const uploadRef = storage.ref("images").child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImage = { id: fileName, path: downloadURL };
        props.setImages(newImage);
      });
    });
  };

  const deleteImage = (image: Image) => {
    if (!props.images) {
      return false;
    }
    const ret = window.confirm("この画像を削除しますか？");
    if (!ret) {
      return false;
    } else {
      const newImages = { id: "", path: "" };
      props.setImages(newImages);
      return storage.ref("images").child(image.id).delete();
    }
  };

  return (
    <div className="d-flex mm f-center">
      <span>変更</span>
      <IconButton className={classes.icon}>
        <label>
          <AddCircleIcon />
          <input
            className="d-hidden"
            id="image"
            onChange={(event) => uploadImage(event)}
            type="file"
          />
        </label>
      </IconButton>
      {props.images ? (
        <div onClick={() => deleteImage(props.images)}>
          <ImagePreview path={props.images.path} />
        </div>
      ) : (
        <NoImageArea />
      )}
    </div>
  );
};

export default ImageArea;
