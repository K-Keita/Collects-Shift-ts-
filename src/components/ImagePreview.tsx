import React, { FC } from "react";

interface Props {
  path: string;
}

const ImagePreview: FC<Props> = (props) => {
  return (
    <div className="image-area">
      <div className="p-media__thumb">
        <img alt="プレビュー画像" src={props.path} />
      </div>
    </div>
  );
};

export default ImagePreview;
