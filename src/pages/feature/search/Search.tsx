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
} from "jfront-components";
import { useHistory } from "react-router-dom";
import { Form } from "jfront-components";
import { FormField } from "jfront-components";
import Label from "../../../components/label";
import Input from "../../../components/input";
import {
  getResultSetSize,
  postSearchRequest,
} from "../../../api/feature/FeatureApi";
import { SearchRequest } from "../../../api/types";
import { FeatureSearchTemplate } from "../../../api/feature/FeatureInterface";
import { Tab, TabPanel } from "jfront-components";
import { SearchContext } from "../../../context";
import { FeatureStatusOptions } from "../../../api/feature-process/FeatureProcessInterface";
import { getFeatureStatusOptions } from "../../../api/feature-process/FeatureProcessApi";
import { useFormik } from "formik";
import { DatePicker } from "jfront-components";
import { useTranslation } from "react-i18next";
import CheckBoxGroup, {
  CheckBoxGroupNew,
} from "../../../components/checkbox-group";
import CheckBox from "../../../components/checkbox";
// import CheckBox from "../../../components/checkbox-group";

const SearchPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  let [statusOptions, setStatusOptions] = useState<FeatureStatusOptions[]>();

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

    let searchRequest: SearchRequest<FeatureSearchTemplate> = {
      template: data,
    };

    postSearchRequest(searchRequest).then((searchId) => {
      getResultSetSize(searchId).then((resultSize) => {
        if (resultSize > 0) {
          searchContext?.setSearch(searchId);
          history.push(`/list/${searchId}/?pageSize=25&page=1`);
        } else {
          alert("Search empty!");
        }
      });
    });
  };

  useEffect(() => {
    getFeatureStatusOptions().then((options) => {
      setStatusOptions(options);
    });
  }, []);

  const formik = useFormik<FeatureSearchTemplate>({
    initialValues: {},
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
        <ToolbarButtonBase
          disabled={!searchContext?.getSearch()}
          onClick={() => {
            let searchId = searchContext?.getSearch();
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
          <Label>{t("feature.fields.dateInsFrom")}:</Label>
          <DatePicker
            name="dateInsFrom"
            selected={formik.values.dateInsFrom}
            onChange={(date) => {
              formik.setFieldValue("dateInsFrom", date);
            }}
          />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.dateInsTo")}:</Label>
          <DatePicker
            name="dateInsTo"
            selected={formik.values.dateInsTo}
            onChange={(date) => {
              formik.setFieldValue("dateInsTo", date);
            }}
          />
        </FormField>
        <FormField>
          <Label>{t("feature.fields.statusCodeList")}</Label>
          {/* <select
            name="statusCodeList"
            value={formik.values.statusCodeList}
            onChange={formik.handleChange}
            multiple={true}
          >
            <option value={undefined}></option>
            {statusOptions
              ? statusOptions.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })
              : null}
          </select> */}
          {/* <CheckBoxGroupNew
            name="fruits"
            value={
              formik.values.statusCodeList ? formik.values.statusCodeList : []
            }
            onChange={(newValue) => {
              formik.setFieldValue("statusCodeList", newValue);
            }}
          >
            {(Checkbox) => (
              <>
                <label>
                  <Checkbox value="apple" /> Apple
                </label>
                <label>
                  <Checkbox value="orange" /> Orange
                </label>
                <label>
                  <Checkbox value="watermelon" /> Watermelon
                </label>
                {statusOptions
                  ? statusOptions.map((option) => {
                      return (
                        <label>
                          <Checkbox value={option.value} />{" "}
                          {option.name.toString()}
                        </label>
                      );
                    })
                  : null}
              </>
            )}
          </CheckBoxGroupNew> */}
        </FormField>
        <FormField>
          <CheckBoxGroup
            value={
              formik.values.statusCodeList ? formik.values.statusCodeList : []
            }
            onChange={(newValue) => {
              console.log(newValue);
              formik.setFieldValue("statusCodeList", newValue);
            }}
          >
            {statusOptions
              ? statusOptions.map((option) => {
                  return <CheckBox value={option.value} label={option.name} />;
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
