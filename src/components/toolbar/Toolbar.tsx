import React from "react";
import ToolbarButton from "./ToolbarButton";
import styled from "styled-components";

const StyledToolbar = styled.nav`

`;

const Toolbar = () => {
  return (
      <StyledToolbar>
        <ToolbarButton onClick={() => window.alert("Hello!")}>Button1</ToolbarButton>
        <ToolbarButton onClick={() => console.log("Message!")}>Button2</ToolbarButton>
        <ToolbarButton>Button3</ToolbarButton>
      </StyledToolbar>
  );
};

export default Toolbar;