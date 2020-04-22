import React from 'react';
import styled from "styled-components";

interface InputInterface extends React.InputHTMLAttributes<HTMLInputElement> {

}

const StyledInput = styled.input``;

const Input: React.FC<InputInterface> = (props) => {
  return (
      <div>
        <StyledInput {...props}>{props.children}</StyledInput>
      </div>
  );
};

export default Input;