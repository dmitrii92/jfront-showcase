import React from 'react';
import styled from "styled-components";

interface InputInterface extends React.InputHTMLAttributes<HTMLInputElement> {
}

const StyledInput = styled.input`
  width: 200px;
`;
const Input: React.FC<InputInterface> = (props) => {
  return (
      <>
        <StyledInput {...props}>{props.children}</StyledInput>
      </>
  );
};

export default Input;