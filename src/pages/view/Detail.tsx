import React from "react";
import Toolbar from "../../components/toolbar";
import Form from "../../components/form";
import Input from "../../components/input";
import Header from "../../components/header";
import FormField from "../../components/form-field";
import Label from "../../components/label";

const DetailPage = () => {
  return (
      <div>
        <Header>Header</Header>
        <Toolbar/>
        <Form>
          <FormField>
            <Label>Идентификатор:</Label>
            <Input/>
          </FormField>
          <FormField>
            <Label>Имя:</Label>
            <Input style={{width: "250px"}}/>
          </FormField>
        </Form>
      </div>
  );
}

export default DetailPage;