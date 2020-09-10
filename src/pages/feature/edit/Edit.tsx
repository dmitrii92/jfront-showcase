import React, { useContext, useEffect, useState } from "react";
import { Form } from "@jfront/ui-core";
import { FormField } from "@jfront/ui-core";
import { Label } from "@jfront/ui-label";
import { TextInput } from "@jfront/ui-core";
import { getFeature, updateFeature } from "../../../api/feature/FeatureApi";
import { Feature, FeatureUpdate } from "../../../api/feature/FeatureInterface";
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
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

const EditPage = () => {
  const history = useHistory();
  let { featureId } = useParams();
  const searchContext = useContext(SearchContext);
  const [currentFeature, setCurrentFeature] = useState<Feature>();
  const { t } = useTranslation();

  const onSubmit = (data: FeatureUpdate) => {
    if (featureId) {
      updateFeature(featureId.toString(), data).then(() => {
        history.push(`/${featureId}/detail`);
      });
    }
  };

  useEffect(() => {
    getFeature(featureId).then((feature) => {
      setCurrentFeature(feature);
    });
  }, []);

  const formik = useFormik<FeatureUpdate>({
    initialValues: {
      featureName: currentFeature?.featureName
        ? currentFeature?.featureName
        : "",
      featureNameEn: currentFeature?.featureNameEn
        ? currentFeature?.featureNameEn
        : "",
      description: currentFeature?.description
        ? currentFeature?.description
        : "",
    },
    onSubmit: (values: FeatureUpdate) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <TabPanel>
        <Tab selected={true}>{t("feature.header")}</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/create`)} />
        <ToolbarButtonSave
          onClick={() => {
            let button = document.getElementById("edit-submit");
            if (button) {
              button.click();
            }
          }}
        />
        <ToolbarButtonEdit disabled={true} />
        <ToolbarButtonDelete />
        <ToolbarButtonView
          onClick={() => history.push(`/${featureId}/detail`)}
        />
        <ToolbarSplitter />
        <ToolbarButtonBase
          onClick={() => {
            let searchId = searchContext?.getId();
            history.push(`/list/${searchId}/?pageSize=25&page=1`);
          }}
        >
          {t("toolbar.list")}
        </ToolbarButtonBase>
        <ToolbarButtonFind onClick={() => history.push(`/`)} />
        <ToolbarButtonBase disabled={true}>
          {t("toolbar.find")}
        </ToolbarButtonBase>
      </Toolbar>
      <Form id="edit-form" onSubmit={formik.handleSubmit}>
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
          <TextInput
            style={{ width: "350px", textAlign: "left" }}
            defaultValue={currentFeature?.featureName}
            name="featureName"
            value={formik.values.featureName}
            onChange={formik.handleChange}
          />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.featureNameEn")}:</Label>
          <TextInput
            style={{ width: "350px", textAlign: "left" }}
            defaultValue={currentFeature?.featureNameEn}
            name="featureNameEn"
            value={formik.values.featureNameEn}
            onChange={formik.handleChange}
          />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.dateIns")}:</Label>
          <Label
            style={{
              width: "350px",
              textAlign: "left",
            }}
          >
            {currentFeature?.dateIns.toString() ? new Date(currentFeature?.dateIns.toString()).toLocaleDateString() : ""}
          </Label>
        </FormField>
        <FormField>
          <Label>{t("feature.fields.description")}:</Label>
          <TextInput
            style={{ width: "350px", textAlign: "left" }}
            defaultValue={currentFeature?.description}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.author")}:</Label>
          <Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.author?.name}
          </Label>
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
        <FormField>
          <input id="edit-submit" type="submit" hidden={true} />
        </FormField>
      </Form>
    </>
  );
};

export default EditPage;
