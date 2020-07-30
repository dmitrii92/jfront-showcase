import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Label from "../label";
import {CheckBoxInterface} from "../checkbox/CheckBox";

interface CheckBoxGroupInterface {
  text?: string;
  onChange?: (newValue: any[]) => any;
  children: (CheckBox: React.FC<CheckBoxInterface>) => JSX.Element;
}

const StyledCheckBoxGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
  //flex-direction: column;
`;

const StyledUl = styled.div`
  width: 200px;
  margin: 2px;
  padding: 5px;
  border: 1px solid grey;
  //text-align: left;
  padding-left: 0;
`;

const CheckBoxGroup: React.FC<CheckBoxGroupInterface> = (props) => {
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  // React.Children.forEach(children, )

  return (
    <StyledCheckBoxGroup>
      <Label>{props.text}</Label>
      <StyledUl>{props.children}</StyledUl>
    </StyledCheckBoxGroup>
  );
};

export default CheckBoxGroup;
