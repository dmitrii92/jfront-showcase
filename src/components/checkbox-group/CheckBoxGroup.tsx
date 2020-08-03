import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Label from "../label";
import { CheckBoxInterface } from "../checkbox/CheckBox";
import createFragment from "react-addons-create-fragment";

interface CheckBoxGroupInterface {
  // children: (CheckBox: React.FC<CheckBoxInterface>) => JSX.Element;
  name?: string;
  value?: any[];
  text?: string;
  // onChange?: (newValue: any[]) => any;

  /**
   * Обработчик изменения значения 'checked' одного из дочерних элементов
   */
  onChange?: (value?: any[], event?: React.ChangeEvent<any>) => void;
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

  let checkboxes: any[];
  const checkboxGroupParts = {};
  // let state = {
  //   value: [],
  // };

  let [state, setState] = useState<any[]>([]); //{value: [],}

  let handleCheckboxChange = (value, checked, event) => {
    console.log(handleCheckboxChange);
    const newValue = props.value ? props.value.slice() : state.slice();
    const changedValueIndex = newValue.findIndex(
      (stateValue: any) => stateValue === value
    );

    if (checked) {
      newValue.push(value);
    } else {
      newValue.splice(changedValueIndex, 1);
    }

    setState(newValue);

    if (props.onChange) {
      props.onChange(newValue, event);
    }
  };

  let children: React.ReactNode = null;

  if (props.children) {
    const { children: propsChildren } = props;

    children = React.Children.toArray(propsChildren);
  }

  if (children) {
    checkboxes = [];

    const value = props.value === undefined ? state : props.value;

    React.Children.forEach(children, (checkbox, index) => {
      if (React.isValidElement(checkbox)) {
        const checkboxNode = React.cloneElement(checkbox, {
          ref: (checkbox: any) => checkboxes.push(checkbox),
          checked:
            checkbox.props.checked === undefined
              ? value.some((groupValue) => groupValue === checkbox.props.value)
              : checkbox.props.checked,
          onChange:
            checkbox.props.onChange === undefined
              ? (checked: any, _text: any, event: any) =>
                  handleCheckboxChange(checkbox.props.value, checked, event)
              : checkbox.props.onChange,
          ...props,
        });

        checkboxGroupParts[`checkbox-${index}`] = checkboxNode;
      }
    });
  }

  return (
    <StyledCheckBoxGroup>
      <Label>{props.text}</Label>
      {/* <StyledUl>{props.children}</StyledUl> */}
      <div>{createFragment(checkboxGroupParts)}</div>
    </StyledCheckBoxGroup>
  );
};

export default CheckBoxGroup;
