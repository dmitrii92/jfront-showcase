import React from "react";

import btn_add from "./icons/add.png";
import btn_save from "./icons/save.png";
import btn_edit from "./icons/edit.png";
import btn_find from "./icons/search.png";

import ToolbarButton, {ToolbarButtonInterface} from "./ToolbarButton";


const ToolbarButtonFind:React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButton {...props}>
        <img src={btn_find}/>
      </ToolbarButton>
  );
};

const ToolbarButtonCreate:React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButton {...props}>
        <img src={btn_add}/>
      </ToolbarButton>
  );
};

const ToolbarButtonSave:React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButton {...props}>
        <img src={btn_save}/>
      </ToolbarButton>
  );
};

const ToolbarButtonEdit:React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButton {...props}>
        <img src={btn_edit}/>
      </ToolbarButton>
  );
};

export {ToolbarButtonFind, ToolbarButtonCreate, ToolbarButtonSave, ToolbarButtonEdit}