import React, {useEffect, useState} from "react";
import Form from "../../components/form";
import FormField from "../../components/form-field";
import Label from "../../components/label";
import Input from "../../components/input";
import {getFeature} from "../../api/FeatureApi";
import {Feature} from "../../api/FeatureInterface";
import {useHistory, useParams} from "react-router-dom";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../components/toolbar/buttons";
import ToolbarBase from "../../components/toolbar/ToolbarBase";

const EditPage = () => {
  const history = useHistory();
  let {id} = useParams();

  const [currentFeature, setCurrentFeature] = useState<Feature>();

  useEffect(() => {
    getFeature(id).then(feature => {
          setCurrentFeature(feature);
        }
    );
  }, []);

  return (
      <div>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete/>
          <ToolbarButtonView onClick={() => history.goBack()}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Form>
          <FormField>
            <Label>Идентификатор:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.featureId}/>
          </FormField>
          <FormField>
            <Label>Статус:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.featureStatus.name}/>
          </FormField>
          <FormField>
            <Label>Наименование:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.featureName}/>
          </FormField>
          <FormField>
            <Label>Наименование английское:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.featureNameEn}/>
          </FormField>
          <FormField>
            <Label>Дата создания:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.dateIns.toString()}/>
          </FormField>
          <FormField>
            <Label>Описание:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.description}/>
          </FormField>
          <FormField>
            <Label>Автор:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.author.name}/>
          </FormField>
          <FormField>
            <Label>Порядок выполнения:</Label>
            <Input/>
          </FormField>
          <FormField>
            <Label>Ответственный:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.responsible.name}/>
          </FormField>
        </Form>
      </div>
  );
}

export default EditPage;