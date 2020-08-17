import React, { useContext, useEffect, useState } from "react";
import { Form } from "@jfront/ui-core";
import { FormField } from "@jfront/ui-core";
import Label from "../../../components/label";
import { deleteFeature, getFeature } from "../../../api/feature/FeatureApi";
import { Feature } from "../../../api/feature/FeatureInterface";
import { useHistory, useParams } from "react-router-dom";
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView,
  ToolbarSplitter,
} from "@jfront/ui-core";
import { Tab, TabPanel } from "@jfront/ui-core";
import { SearchContext } from "../../../context";
import { useTranslation } from "react-i18next";

const DetailPage = () => {
  const history = useHistory();
  let { featureId } = useParams();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(true);
  const [currentFeature, setCurrentFeature] = useState<Feature>();
  const searchContext = useContext(SearchContext);
  const { t } = useTranslation();

  useEffect(() => {
    getFeature(featureId).then((feature) => {
      setCurrentFeature(feature);
    });
  }, []);

  return (
    <>
      <TabPanel>
        <Tab
          selected={mainTabSelected}
          onClick={() => {
            setMainTabSelected(true);
          }}
        >
          {t("feature.header")}
        </Tab>
        <Tab
          selected={!mainTabSelected}
          onClick={() => {
            setMainTabSelected(false);
            history.push(`/${featureId}/feature-process`);
          }}
        >
          {t("feature-process.header")}
        </Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/create`)} />
        <ToolbarButtonSave disabled={true} />
        <ToolbarButtonEdit onClick={() => history.push(`/${featureId}/edit`)} />
        <ToolbarButtonDelete
          onClick={() => {
            if (featureId) {
              deleteFeature(featureId).then(() => {
                let searchId = searchContext?.getId();
                if (searchId) {
                  history.push(`/list/${searchId}/?pageSize=25&page=1`);
                } else {
                  history.push(`/`);
                }
              });
            }
          }}
        />
        <ToolbarButtonView disabled={true} />
        <ToolbarSplitter />
        <ToolbarButtonBase
          onClick={() => {
            let searchId = searchContext?.getId();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`);
            } else {
              history.push("/");
            }
          }}
        >
          {t("toolbar.list")}
        </ToolbarButtonBase>
        <ToolbarButtonFind onClick={() => history.push(`/`)} />
        <ToolbarButtonBase disabled={true}>
          {t("toolbar.find")}
        </ToolbarButtonBase>
      </Toolbar>
      <Form>
        <FormField>
          <Label>{t("feature.fields.featureId")}:</Label>
          <Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.featureId}
          </Label>
        </FormField>
        <FormField>
          <Label>{t("feature.fields.featureStatus")}:</Label>
          <Label
            style={{
              width: "350px",
              textAlign: "left",
            }}
          >
            {currentFeature?.featureStatus?.name}
          </Label>
        </FormField>
        <FormField>
          <Label>{t("feature.fields.featureName")}:</Label>
          <Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.featureName}
          </Label>
        </FormField>
        <FormField>
          <Label>{t("feature.fields.featureNameEn")}:</Label>
          <Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.featureNameEn}
          </Label>
        </FormField>
        <FormField>
          <Label>{t("feature.fields.dateIns")}:</Label>
          <Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.dateIns.toString() ? new Date(currentFeature?.dateIns.toString()).toLocaleDateString() : ""}
          </Label>
        </FormField>
        <FormField>
          <Label>{t("feature.fields.description")}:</Label>
          <Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.description}
          </Label>
        </FormField>
        <FormField>
          <Label>{t("feature.fields.author")}:</Label>
          <Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.author?.name}
          </Label>
        </FormField>
        <FormField>
          <Label>Порядок выполнения:</Label>
          <Label />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.responsible")}:</Label>
          <Label
            style={{
              width: "350px",
              textAlign: "left",
            }}
          >
            {currentFeature?.responsible?.name}
          </Label>
        </FormField>
      </Form>
    </>
  );
};

export default DetailPage;
