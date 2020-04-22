import React from "react";

import ToolbarButtonBase from "./buttons/ToolbarButtonBase";
import {ToolbarButtonCreate, ToolbarButtonEdit, ToolbarButtonFind, ToolbarButtonSave} from "./buttons";
import ToolbarBase, {ToolbarInterface} from "./ToolbarBase";


const Toolbar: React.FC<ToolbarInterface> = (props) => {
  return (
      <ToolbarBase {...props}>
        <ToolbarButtonBase onClick={() => window.alert("Hello!")}>Button1</ToolbarButtonBase>
        <ToolbarButtonBase onClick={() => console.log("Message!")}>Button2</ToolbarButtonBase>
        <ToolbarButtonBase>Button3</ToolbarButtonBase>
        <ToolbarButtonBase disabled={true}>Disabled Button</ToolbarButtonBase>
        <ToolbarButtonCreate/>
        <ToolbarButtonSave/>
        <ToolbarButtonEdit/>
        <ToolbarButtonFind/>
        {props.children}
      </ToolbarBase>
  );
};

export default Toolbar;