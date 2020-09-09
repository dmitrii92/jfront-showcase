import React, { useContext, useEffect, useState } from "react";
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
import { Form } from "@jfront/ui-core";
import { FormField } from "@jfront/ui-core";
import Label from "../../../components/label";
import Input from "../../../components/input";
import { FeatureSearchTemplate } from "../../../api/feature/FeatureInterface";
import { Tab, TabPanel } from "@jfront/ui-core";
import { SearchContext } from "../../../context";
import { FeatureStatusOptions } from "../../../api/feature-process/FeatureProcessInterface";
import { getFeatureStatusOptions } from "../../../api/feature-process/FeatureProcessApi";
import { useFormik } from "formik";
import { DatePicker } from "@jfront/ui-core";
import { useTranslation } from "react-i18next";
import CheckBoxGroup from "../../../components/checkbox-group";
import CheckBox from "../../../components/checkbox";
import queryString from "query-string";

const SearchPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  let [statusOptions, setStatusOptions] = useState<FeatureStatusOptions[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onSubmit = (data: FeatureSearchTemplate) => {
    if (!data.featureId) {
      data.featureId = undefined;
    }
    if (!data.dateInsFrom) {
      data.dateInsFrom = undefined;
    }
    if (!data.dateInsTo) {
      data.dateInsTo = undefined;
    }

    console.log("queryString.stringify(data):");
    console.log(queryString.stringify(data));
    let query = queryString.stringify(data);
    if (query) {
      query = "&" + query;
    }
    history.push(`/list/?pageSize=25&page=1${query}`);
  };

  useEffect(() => {
    getFeatureStatusOptions().then((options) => {
      setStatusOptions(options);
      setIsLoading(false);
    });
  }, []);

  const formik = useFormik<FeatureSearchTemplate>({
    initialValues: searchContext.getTemplate(),
    onSubmit: (values: FeatureSearchTemplate) => {
      onSubmit(values);
    },
  });

  return (
    <>
      <TabPanel>
        <Tab selected={true}>{t("feature.header")}</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/create`)} />
        <ToolbarButtonSave disabled={true} />
        <ToolbarButtonEdit disabled={true} />
        <ToolbarButtonDelete disabled={true} />
        <ToolbarButtonView disabled={true} />
        <ToolbarSplitter />
        <ToolbarButtonBase //TODO: think about code bellow
          disabled={!searchContext?.getId()}
          onClick={() => {
            let searchId = searchContext?.getId();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`);
            }
          }}
        >
          {t("toolbar.list")}
        </ToolbarButtonBase>
        <ToolbarButtonFind disabled={true} />
        <ToolbarButtonBase
          onClick={() => {
            let button = document.getElementById("search-submit");
            if (button) {
              button.click();
            }
          }}
        >
          {t("toolbar.find")}
        </ToolbarButtonBase>
      </Toolbar>
      <Form onSubmit={formik.handleSubmit}>
        <FormField>
          <Label>{t("feature.fields.featureId")}:</Label>
          <Input
            name="featureId"
            value={formik.values.featureId}
            onChange={formik.handleChange}
            type="number"
            autoComplete="off"
          />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.featureNameTemplate")}:</Label>
          <Input
            name="featureNameTemplate"
            value={formik.values.featureNameTemplate}
            onChange={formik.handleChange}
            autoComplete="off"
          />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.featureNameEnTemplate")}:</Label>
          <Input
            name="featureNameEnTemplate"
            value={formik.values.featureNameEnTemplate}
            onChange={formik.handleChange}
            autoComplete="off"
          />
        </FormField>
        <FormField>
          <DatePicker
            name="dateInsFrom"
            label={t("feature.fields.dateInsFrom")}
            selected={formik.values.dateInsFrom}
            onChange={(date) => {
              formik.setFieldValue("dateInsFrom", date);
            }}
          />
        </FormField>
        <FormField>
          <DatePicker
            name="dateInsTo"
            label={t("feature.fields.dateInsTo")}
            selected={formik.values.dateInsTo}
            onChange={(date) => {
              formik.setFieldValue("dateInsTo", date);
            }}
          />
        </FormField>
        <FormField>
          {/*<Label>{t("feature.fields.statusCodeList")}</Label>*/}
          <CheckBoxGroup
            name="statusCodeList"
            text={t("feature.fields.statusCodeList")}
            value={formik.values.statusCodeList ? formik.values.statusCodeList : []}
            onChange={(newValue) => {
              console.log(newValue);
              formik.setFieldValue("statusCodeList", newValue);
            }}
            isLoading={isLoading}
          >
            {statusOptions
              ? statusOptions.map((option) => {
                  return (
                    <CheckBox
                      value={option.value}
                      label={option.name}
                    />
                  );
                })
              : null}
          </CheckBoxGroup>
        </FormField>
        <FormField>
          <Input id="search-submit" type="submit" hidden={true} />
        </FormField>
      </Form>
    </>
  );
};

export default SearchPage;
