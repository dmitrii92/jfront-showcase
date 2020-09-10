import React, { useContext } from "react";
import { Form } from "@jfront/ui-core";
import { FormField } from "@jfront/ui-core";
import {Label} from "@jfront/ui-label";
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
import { useHistory } from "react-router-dom";
import { FeatureCreate } from "../../../api/feature/FeatureInterface";
import { createFeature } from "../../../api/feature/FeatureApi";
import { Tab, TabPanel } from "@jfront/ui-core";
import { SearchContext } from "../../../context";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { TextInput } from "@jfront/ui-core";

const CreatePage = () => {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  const { t } = useTranslation();

  const onSubmit = (data: FeatureCreate) => {
    createFeature(data).then((feature) => {
      history.push(`/${feature.featureId}/detail`);
    });
  };

  const formik = useFormik<FeatureCreate>({
    initialValues: {
      description: "",
      featureName: "",
      featureNameEn: "",
    },
    onSubmit: (values: FeatureCreate) => {
      onSubmit(values);
    },
  });

  return (
    <>
      <TabPanel>
        <Tab selected={true}>{t("feature.header")}</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate disabled={true} />
        <ToolbarButtonSave
          onClick={() => {
            let button = document.getElementById("create-submit");
            if (button) {
              button.click();
            }
          }}
        />
        <ToolbarButtonEdit disabled={true} />
        <ToolbarButtonDelete disabled={true} />
        <ToolbarButtonView disabled={true} />
        <ToolbarSplitter />
        <ToolbarButtonBase
          onClick={() => {
            let searchId = searchContext?.getId();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`);
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
      <Form id="create-form" onSubmit={formik.handleSubmit}>
        <FormField>
          <TextInput
            name="featureName"
            label={t("feature.fields.featureName")}
            value={formik.values.featureName}
            onChange={formik.handleChange}
          />
        </FormField>
        <FormField>
          <TextInput
            name="featureNameEn"
            label={t("feature.fields.featureNameEn")}
            value={formik.values.featureNameEn}
            onChange={formik.handleChange}
          />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.description")}:</Label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </FormField>
        <FormField>
          <input id="create-submit" type="submit" hidden={true} />
        </FormField>
      </Form>
    </>
  );
};

export default CreatePage;
