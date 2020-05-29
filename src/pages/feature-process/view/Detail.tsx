import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {FeatureProcess} from "../../../api/feature-process/FeatureProcessInterface";
import {
  deleteFeatureProcess,
  getFeatureProcess
} from "../../../api/feature-process/FeatureProcessApi";
import {Tab, TabPanel} from "jfront-components";
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonFind,
  ToolbarButtonView,
  ToolbarSplitter
} from "jfront-components";
import {Form} from "jfront-components";
import {FormField} from "jfront-components";
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
          <Tab selected={mainTabSelected} onClick={() => {
            history.push(`/${featureId}/detail`);
          }}>
            Запрос функционала
          </Tab>
          <Tab selected={!mainTabSelected}>
            Статус
          </Tab>
        </TabPanel>
        <Toolbar>
          <ToolbarButtonCreate
              onClick={() => history.push(`/${featureId}/feature-process/create`)}/>
          <ToolbarButtonDelete onClick={() => {
            if (featureId && featureProcessId) {
              deleteFeatureProcess(parseInt(featureId), parseInt(featureProcessId)).then(() => {
                history.push(`/${featureId}/feature-process`);
              });
            }
          }}/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase onClick={() => {
            history.push(`/${featureId}/feature-process`);
          }}>Список</ToolbarButtonBase>
          <ToolbarButtonFind disabled={true}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </Toolbar>
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