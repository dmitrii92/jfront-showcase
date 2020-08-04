import React, { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";
import Label from "../label";

interface CheckBoxGroupInterface {
  children: ReactNode[];
  name?: string;
  value?: any[];
  text?: string;
  disabled?: boolean;

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

  let [state, setState] = useState<any[]>([]);

  const handleCheckboxChange = (
    value: React.ReactText,
    event: React.ChangeEvent<any> | undefined
  ) => {
    const newValue = props.value ? props.value.slice() : state.slice();
    const changedValueIndex = newValue.findIndex(
      (stateValue) => stateValue === value
    );

    if (event.target.checked) {
      newValue.push(value);
    } else {
      newValue.splice(changedValueIndex, 1);
    }

    setState(newValue);

    if (props.onChange) {
      props.onChange(newValue, event);
    }
  };

  return (
    <StyledCheckBoxGroup>
      <Label>{props.text}</Label>
      <StyledUl>
        {React.Children.map(props.children, (checkbox, index) => {
          if (!React.isValidElement(checkbox)) {
            return null;
          }

          return React.cloneElement(checkbox, {
            disabled: checkbox.props.disabled || props.disabled,
            value: props.value[index],
            onChange:
              checkbox.props.onChange === undefined
                ? (event: any, _text: any) =>
                    handleCheckboxChange(checkbox.props.value, event)
                : checkbox.props.onChange,
          });
        })}
      </StyledUl>
    </StyledCheckBoxGroup>
  );
};

export default CheckBoxGroup;
