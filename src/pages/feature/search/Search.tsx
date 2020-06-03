import React, {useContext, useEffect, useState} from "react";
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView,
  ToolbarSplitter
} from "jfront-components";
import {useHistory} from "react-router-dom";
import {Form} from "jfront-components";
import {FormField} from "jfront-components";
import Label from "../../../components/label";
import Input from "../../../components/input";
import {getResultSetSize, postSearchRequest} from "../../../api/feature/FeatureApi";
import {SearchRequest} from "../../../api/types";
import {FeatureSearchTemplate} from "../../../api/feature/FeatureInterface";
import {Tab, TabPanel} from "jfront-components";
import {SearchContext} from "../../../context";
import {FeatureStatusOptions} from "../../../api/feature-process/FeatureProcessInterface";
import {getFeatureStatusOptions} from "../../../api/feature-process/FeatureProcessApi";
import {useFormik} from "formik";
import {DatePicker} from "jfront-components";

const SearchPage = () => {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  let [statusOptions, setStatusOptions] = useState<FeatureStatusOptions[]>();

  const onSubmit = (data: FeatureSearchTemplate) => {
    console.log(data)
    if (!data.featureId) {
      data.featureId = undefined;
    }
    if (!data.dateInsFrom) {
      console.log("data.dateInsFrom =" + data.dateInsFrom)
      data.dateInsFrom = undefined;
    }
    if (!data.dateInsTo) {
      console.log("data.dateInsTo =" + data.dateInsTo)
      data.dateInsTo = undefined;
    }

    let searchRequest: SearchRequest<FeatureSearchTemplate> = {template: data};

    postSearchRequest(searchRequest).then((searchId) => {
      getResultSetSize(searchId).then(resultSize => {
        if (resultSize > 0) {
          searchContext?.setSearch(searchId);
          history.push(`/list/${searchId}/?pageSize=25&page=1`)
        } else {
          alert("Search empty!")
        }
      });
    });

  };

  useEffect(() => {
    getFeatureStatusOptions().then((options) => {
      setStatusOptions(options);
    });
  }, [])

  const formik = useFormik<FeatureSearchTemplate>({
    initialValues: {},
    onSubmit: (values: FeatureSearchTemplate) => {
      onSubmit(values);
    }
  });

  return (
      <>
        <TabPanel>
          <Tab selected={true}>
            Запрос функционала
          </Tab>
        </TabPanel>
        <Toolbar>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase disabled={!searchContext?.getSearch()} onClick={() => {
            let searchId = searchContext?.getSearch();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`)
            }
          }}>Список</ToolbarButtonBase>
          <ToolbarButtonFind disabled={true}/>
          <ToolbarButtonBase onClick={() => {
            let button = document.getElementById("search-submit");
            if (button) {
              button.click();
            }
          }}>Найти</ToolbarButtonBase>
        </Toolbar>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <Label>Идентификатор:</Label>
            <Input name="featureId" value={formik.values.featureId} onChange={formik.handleChange}
                   type="number" autoComplete="off"/>
          </FormField>
          <FormField>
            <Label>Наименование:</Label>
            <Input name="featureNameTemplate" value={formik.values.featureNameTemplate}
                   onChange={formik.handleChange} autoComplete="off"
            />
          </FormField>
          <FormField>
            <Label>Наименование анлийское:</Label>
            <Input name="featureNameEnTemplate" value={formik.values.featureNameEnTemplate}
                   onChange={formik.handleChange} autoComplete="off"/>
          </FormField>
          <FormField>
            <Label>Дата создания, от:</Label>
            <DatePicker
                name="dateInsFrom"
                selected={formik.values.dateInsFrom}
                onChange={(date) => {
                  formik.setFieldValue("dateInsFrom", date)
                }}
            />
          </FormField>
          <FormField>
            <Label>Дата создания, до:</Label>
            <DatePicker
                name="dateInsTo"
                selected={formik.values.dateInsTo}
                onChange={(date) => {
                  formik.setFieldValue("dateInsTo", date)
                }}
            />
          </FormField>
          <FormField>
            <Label>Статус</Label>
            <select name="statusCodeList" value={formik.values.statusCodeList}
                    onChange={formik.handleChange} multiple={true}>
              <option value={undefined}></option>
              {statusOptions ? statusOptions.map(option => {
                return <option key={option.value} value={option.value}>{option.name}</option>
              }) : null}
            </select>
          </FormField>
          <FormField>
            <Input id="search-submit" type="submit" hidden={true}/>
          </FormField>
        </Form>
      </>
  );
}

export default SearchPage;