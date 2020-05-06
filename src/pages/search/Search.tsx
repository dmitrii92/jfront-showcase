import React, {useState} from "react";
import Header from "../../components/header";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView
} from "../../components/toolbar/buttons";
import ToolbarBase from "../../components/toolbar/ToolbarBase";
import { useHistory } from "react-router-dom";
import Form from "../../components/form";
import FormField from "../../components/form-field";
import Label from "../../components/label";
import Input from "../../components/input";

const SearchPage = () => {
  const history = useHistory();
  const [id, setId] = useState();

  return (
      <div>
        <Header>Header</Header>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView/>
          <ToolbarButtonFind/>
          <ToolbarButtonBase onClick={() => history.push(`/detail/${id}`)}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Form>
          <FormField>
            <Label>Идентификатор:</Label>
            <Input value={id} onChange={(e) => setId(e.target.value)}/>
          </FormField>
        </Form>
      </div>
  );
}

export default SearchPage;