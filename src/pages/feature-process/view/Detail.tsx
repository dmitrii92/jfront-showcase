import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {FeatureProcess} from "../../../api/feature-process/FeatureProcessInterface";
import {getFeatureProcess} from "../../../api/feature-process/FeatureProcessApi";
import {Tab, TabPanel} from "../../../components/tabpanel/TabPanel";
import ToolbarButtonBase, {
  ToolbarButtonCreate, ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../../components/toolbar/buttons";
import ToolbarBase from "../../../components/toolbar/ToolbarBase";
import Form from "../../../components/form";
import FormField from "../../../components/form-field";
import Label from "../../../components/label";

const FeatureProcessDetailPage = () => {

  const history = useHistory();
  let {featureId, featureProcessId} = useParams();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(false);
  const [featureProcess, setFeatureProcess] = useState<FeatureProcess>();
  
  useEffect(() => {
    console.log("FeatureProcessDetailPage effect");
    console.log(featureId)
    console.log(featureProcessId)
    if (featureId && featureProcessId) {
      console.log("&&")
      getFeatureProcess(parseInt(featureId), featureProcessId).then(featureProcess => {
        console.log(featureProcess);
        setFeatureProcess(featureProcess);
      })
    }
  }, []);
  
  return (
      <div>
        <TabPanel>
          <Tab selected={mainTabSelected} onClick={() => {history.push("/")}}>
            Запрос функционала
          </Tab>
          <Tab selected={!mainTabSelected}>
            Статус
          </Tab>
        </TabPanel>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/${featureId}/feature-process/create`)}/>
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
            <Label>Статус</Label>
            <Label>{featureProcess?.featureStatusName}</Label>
          </FormField>
          <FormField>
            <Label>Дата создания</Label>
            <Label>{featureProcess?.dateIns}</Label>
          </FormField>
        </Form>
      </div>
  );
}

export default FeatureProcessDetailPage;