import React from "react";
import ToolbarButton from "./buttons/ToolbarButton";
import styled from "styled-components";
import {ToolbarButtonCreate, ToolbarButtonEdit, ToolbarButtonFind, ToolbarButtonSave} from "./buttons";

const StyledToolbar = styled.nav`
  font: 11px arial, tahoma, helvetica, sans-serif;
  vertical-align: middle;
  margin: 0;
  padding: 2px;
  border-style: solid;
  border-color: #99bbe8;
  border-width: 0 1px 1px 1px;
  overflow: hidden;
  background-color: #d0def0;
  background-image: url(bg.gif);
  background-position: 0 5%;
`;

const Toolbar = () => {
  return (
      <StyledToolbar>
        <ToolbarButton onClick={() => window.alert("Hello!")}>Button1</ToolbarButton>
        <ToolbarButton onClick={() => console.log("Message!")}>Button2</ToolbarButton>
        <ToolbarButton>Button3</ToolbarButton>
        <ToolbarButton disabled={true}>Disabled Button</ToolbarButton>
        <ToolbarButtonCreate/>
        <ToolbarButtonSave/>
        <ToolbarButtonEdit/>
        <ToolbarButtonFind/>
      </StyledToolbar>
  );
};

export default Toolbar;