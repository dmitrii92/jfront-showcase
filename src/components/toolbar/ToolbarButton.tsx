import React from "react";

import styled from 'styled-components';

interface ToolbarButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const StyledButton = styled.button`
  color: darkblue;
`;

const ToolbarButton: React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <StyledButton {...props}>{props.children}</StyledButton>
  );
};

export default ToolbarButton;