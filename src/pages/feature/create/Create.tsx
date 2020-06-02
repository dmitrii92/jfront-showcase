import React, {useContext} from "react";
import {Form} from "jfront-components";
import Input from "../../../components/input";
import {FormField} from "jfront-components";
import Label from "../../../components/label";
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
import {useHistory} from "react-router-dom";
import {FeatureCreate} from "../../../api/feature/FeatureInterface";
import {createFeature} from "../../../api/feature/FeatureApi";
import {Tab, TabPanel} from "jfront-components";
import {SearchContext} from "../../../context";
import {useFormik} from "formik";

const CreatePage = () => {
  const history = useHistory();
  const searchContext = useContext(SearchContext);

  const onSubmit = (data: FeatureCreate) => {
    console.log(data)
    console.log("data.featureName" + data.featureName)
    createFeature(data).then((feature) => {
      history.push(`/${feature.featureId}/detail`);
    })
  };

  const formik = useFormik<FeatureCreate>({
    initialValues: {
      description: "",
      featureName: "",
      featureNameEn: "",
    },
    onSubmit: (values: FeatureCreate) => {
      onSubmit(values);
    }
  });

  return (
      <div>
        <TabPanel>
          <Tab selected={true}>
            Запрос функционала
          </Tab>
        </TabPanel>
        <Toolbar>
          <ToolbarButtonCreate disabled={true}/>
          <ToolbarButtonSave onClick={() => {
            let button = document.getElementById("create-submit");
            if (button) {
              button.click();
            }
          }}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase onClick={() => {
            let searchId = searchContext?.getSearch();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`)
            }
          }}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </Toolbar>
        <Form id="create-form" onSubmit={formik.handleSubmit}>
          <FormField>
            <Label>Наименование:</Label>
            <Input name="featureName" value={formik.values.featureName} onChange={formik.handleChange}/>
          </FormField>
          <FormField>
            <Label>Наименование английское:</Label>
            <Input name="featureNameEn" value={formik.values.featureNameEn} onChange={formik.handleChange}/>
          </FormField>
          <FormField>
            <Label>Описание:</Label>
            <textarea name="description" value={formik.values.description} onChange={formik.handleChange}/>
          </FormField>
          <FormField>
            <Input id="create-submit" type="submit" hidden={true}/>
          </FormField>
        </Form>
      </div>
  );
}

export default CreatePage;