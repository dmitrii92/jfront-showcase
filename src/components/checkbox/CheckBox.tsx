import React from "react";
import styled from "styled-components";
import Label from "../label";

interface CheckBoxInterface extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
}

const StyledCheckBox = styled.input`  
`;

const StyledCheckBoxLabel = styled.label``;

const CheckBox: React.FC<CheckBoxInterface> = (props) => {
  console.log(props);
  return (
      <div>
        <Label>{props.text}</Label>
        <StyledCheckBox type="checkbox" {...props}/>
      </div>
  );
}

export default CheckBox;