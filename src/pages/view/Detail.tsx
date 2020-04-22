import React from "react";
import Toolbar from "../../components/toolbar";
import Form from "../../components/form";
import Input from "../../components/input";
import Header from "../../components/header";

const DetailPage = () => {
  return (
      <div>
        <Header>Header</Header>
        <Toolbar/>
        <Form>
          <Input/>
          <Input/>
        </Form>
      </div>
  );
}

export default DetailPage;