import React from "react";
import styled from "styled-components";

interface LabelInterface extends React.LabelHTMLAttributes<HTMLLabelElement>{
}

const StyledLabel = styled.label`
  display: block;
  text-align: right;
  width: 200px;
  min-width: 200px;
  padding-right: 5px;
  float: left;
`;

const Label: React.FC<LabelInterface> = (props) => {
  return (
      <StyledLabel {...props}>{props.children}</StyledLabel>
  );
}

export default Label;