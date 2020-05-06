import React from "react";
import styled from "styled-components";

interface ButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const StyledButton = styled.button`

`;

const Button:React.FC<ButtonInterface> = (props) => {
  return (
      <StyledButton {...props}>{props.children}</StyledButton>
  );
};

export default Button;