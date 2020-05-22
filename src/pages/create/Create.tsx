import React from "react";
import Form from "../../components/form";
import Input from "../../components/input";
import FormField from "../../components/form-field";
import Label from "../../components/label";
import ToolbarBase from "../../components/toolbar/ToolbarBase";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../components/toolbar/buttons";
import {useHistory} from "react-router-dom";
import { useForm } from "react-hook-form/dist/react-hook-form.ie11";
import {FeatureCreate} from "../../api/FeatureInterface";
import {createFeature} from "../../api/FeatureApi";

const CreatePage = () => {
  const history = useHistory();

  const {register, handleSubmit} = useForm<FeatureCreate>();

  const onSubmit = handleSubmit((data: FeatureCreate) => {
    console.log(data)
    console.log("data.featureName" + data.featureName)
    createFeature(data).then((feature) => {
      history.push(`/detail/${feature.featureId}`);
    })
  });

  return (
      <div>
        <ToolbarBase>
          <ToolbarButtonCreate disabled={true}/>
          <ToolbarButtonSave onClick={() => {
            let button = document.getElementById("create-submit");
            if (button) {
              button.click();
            }
          }}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase disabled={true}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Form id="create-form" onSubmit={onSubmit}>
          <FormField>
            <Label>Наименование:</Label>
            <Input name="featureName" ref={register}/>
          </FormField>
          <FormField>
            <Label>Наименование английское:</Label>
            <Input name="featureNameEn" ref={register}/>
          </FormField>
          <FormField>
            <Label>Описание:</Label>
            <textarea name="description" ref={register}/>
          </FormField>
          <FormField>
            <Input id="create-submit" type="submit" hidden={true}/>
          </FormField>
        </Form>
      </div>
  );
}

export default CreatePage;