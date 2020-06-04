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
import {useTranslation} from "react-i18next";

const FeatureProcessDetailPage = () => {
  const {t} = useTranslation();
  const history = useHistory();
  let {featureId, featureProcessId} = useParams();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(false);
  const [featureProcess, setFeatureProcess] = useState<FeatureProcess>();

  useEffect(() => {
    if (featureId && featureProcessId) {
      getFeatureProcess(parseInt(featureId), featureProcessId).then(featureProcess => {
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
            {t("feature.header")}
          </Tab>
          <Tab selected={!mainTabSelected}>
            {t("feature-process.header")}
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
          }}>{t("toolbar.list")}</ToolbarButtonBase>
          <ToolbarButtonFind disabled={true}/>
          <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
        </Toolbar>
        <Form>
          <FormField>
            <Label>{t("feature-process.fields.featureStatusCode")}</Label>
            <Label>{featureProcess?.featureStatusName}</Label>
          </FormField>
          <FormField>
            <Label>{t("feature-process.fields.dateIns")}</Label>
            <Label>{featureProcess?.dateIns}</Label>
          </FormField>
        </Form>
      </div>
  );
}

export default FeatureProcessDetailPage;