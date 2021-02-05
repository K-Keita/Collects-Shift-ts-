import React, { FC, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

interface Props {
  content: JSX.Element;
  label: string;
}

const ToggleContent: FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const icon = open ? (
    <ExpandLessIcon fontSize="large" className="icon-box" />
  ) : (
    <ExpandMoreIcon fontSize="large" className="icon-box" />
  );
  const moreContent = open ? "main-container d-flex" : "d-hidden";

  return (
    <>
      <div className="d-flex f-between" onClick={toggleOpen}>
        <p className="set-title">{props.label}</p>
        {icon}
      </div>
      <div className={moreContent}>{props.content}</div>
    </>
  );
};

export default ToggleContent;
