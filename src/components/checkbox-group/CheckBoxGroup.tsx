import React from "react";
import styled from "styled-components";
import Label from "../label";

interface CheckBoxGroupInterface {
  text?: string;
}

const StyledCheckBoxGroup = styled.div`
  display: flex;
  justify-content: left;
  //flex-direction: column;
`;

const StyledUl = styled.ul`
  margin-top: 0;
  border: 1px solid grey;
  //text-align: left;
  padding-left: 0;
`;

const CheckBoxGroup: React.FC<CheckBoxGroupInterface> = (props) => {
  return (
      <StyledCheckBoxGroup>
        <Label>{props.text}</Label>
        <StyledUl {...props}>
          {props.children}
        </StyledUl>
      </StyledCheckBoxGroup>
  );
}

export default CheckBoxGroup;