import React from "react";
import Form from "../../components/form";
import Input from "../../components/input";
import Header from "../../components/header";
import FormField from "../../components/form-field";
import Label from "../../components/label";
import CheckBox from "../../components/checkbox";
import CheckBoxGroup from "../../components/checkbox-group";
import ToolbarBase from "../../components/toolbar/ToolbarBase";
import {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView
} from "../../components/toolbar/buttons";

const CreatePage = () => {
  return (
      <div>
        <Header>Create</Header>
        <ToolbarBase>
          <ToolbarButtonCreate disabled={true}/>
          <ToolbarButtonSave/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView/>
          <ToolbarButtonFind/>
        </ToolbarBase>
        <Form>
          <FormField>
            <Label>Идентификатор:</Label>
            <Input/>
          </FormField>
          <FormField>
            <Label>Имя:</Label>
            <Input style={{width: "250px"}}/>
          </FormField>
          <FormField>
            <CheckBox text="Text1:"/>
          </FormField>
          <FormField>
            <CheckBoxGroup text="Группа:">
              <CheckBox text="Text2:"/>
              <CheckBox text="Text3:"/>
            </CheckBoxGroup>
          </FormField>
        </Form>
      </div>
  );
}

export default CreatePage;