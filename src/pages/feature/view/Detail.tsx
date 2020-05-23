import React, {useEffect, useState} from "react";
import Form from "../../../components/form";
import FormField from "../../../components/form-field";
import Label from "../../../components/label";
import {getFeature} from "../../../api/feature/FeatureApi";
import {Feature} from "../../../api/feature/FeatureInterface";
import {useHistory, useParams} from "react-router-dom";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../../components/toolbar/buttons";
import ToolbarBase from "../../../components/toolbar/ToolbarBase";
import {Tab, TabPanel} from "../../../components/tabpanel/TabPanel";

const DetailPage = () => {
  const history = useHistory();
  let {featureId} = useParams();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(true);
  const [currentFeature, setCurrentFeature] = useState<Feature>();

  useEffect(() => {
    getFeature(featureId).then(feature => {
          setCurrentFeature(feature);
        }
    );
  }, []);

  return (
      <div>
        <TabPanel>
          <Tab selected={mainTabSelected} onClick={() => {setMainTabSelected(true)}}>
            Запрос функционала
          </Tab>
          <Tab selected={!mainTabSelected} onClick={() => {setMainTabSelected(false)}}>
            Статус
          </Tab>
        </TabPanel>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit onClick={() => history.push(`/${featureId}/edit`)}/>
          <ToolbarButtonDelete/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase onClick={() => history.goBack()}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Form>
          <FormField>
            <Label>Идентификатор:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureId}</Label>
          </FormField>
          <FormField>
            <Label>Статус:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureStatus.name}</Label>
          </FormField>
          <FormField>
            <Label>Наименование:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureName}</Label>
          </FormField>
          <FormField>
            <Label>Наименование английское:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureNameEn}</Label>
          </FormField>
          <FormField>
            <Label>Дата создания:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.dateIns}</Label>
          </FormField>
          <FormField>
            <Label>Описание:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.description}</Label>
          </FormField>
          <FormField>
            <Label>Автор:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.author.name}</Label>
          </FormField>
          <FormField>
            <Label>Порядок выполнения:</Label>
            <Label/>
          </FormField>
          <FormField>
            <Label>Ответственный:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.responsible.name}</Label>
          </FormField>
        </Form>
      </div>
  );
}

export default DetailPage;