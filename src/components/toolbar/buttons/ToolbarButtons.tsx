import React from "react";

import btn_add from "./icons/add.png";
import btn_save from "./icons/save.png";
import btn_edit from "./icons/edit.png";
import btn_find from "./icons/search.png";

import ToolbarButtonBase, {ToolbarButtonInterface} from "./ToolbarButtonBase";


const ToolbarButtonFind:React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_find}/>
      </ToolbarButtonBase>
  );
};

const ToolbarButtonCreate:React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_add}/>
      </ToolbarButtonBase>
  );
};

const ToolbarButtonSave:React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_save}/>
      </ToolbarButtonBase>
  );
};

const ToolbarButtonEdit:React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_edit}/>
      </ToolbarButtonBase>
  );
};

export {ToolbarButtonFind, ToolbarButtonCreate, ToolbarButtonSave, ToolbarButtonEdit}