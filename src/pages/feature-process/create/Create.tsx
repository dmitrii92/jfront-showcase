import React, {useEffect, useState} from "react";
import {Tab, TabPanel} from "jfront-components";
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
import {useHistory, useParams} from "react-router-dom";
import {
  FeatureProcessCreate,
  FeatureStatusOptions
} from "../../../api/feature-process/FeatureProcessInterface";
import {Form} from "jfront-components";
import {FormField} from "jfront-components";
import {
  createFeatureProcess,
  getFeatureStatusOptions
} from "../../../api/feature-process/FeatureProcessApi";
import Label from "../../../components/label";
import {useFormik} from "formik";

const FeatureProcessCreatePage = () => {

  const history = useHistory();
  let {featureId} = useParams();
  const mainTabSelected = false;
  let [statusOptions, setStatusOptions] = useState<FeatureStatusOptions[]>();
  // const {register, handleSubmit} = useForm<FeatureProcessCreate>();

  const onSubmit = (data: FeatureProcessCreate) => {
    console.log(data.featureStatusCode)
    if (featureId) {
      createFeatureProcess(parseInt(featureId), data).then(value => {
        history.push(`/${value.featureId}/feature-process/${value.featureProcessId}/detail`);
      });
    }
  };

  useEffect(() => {
    getFeatureStatusOptions().then((options) => {
      console.log(options);
      setStatusOptions(options);
      console.log(statusOptions);
    });
  }, [])

  const formik = useFormik<FeatureProcessCreate>({
    initialValues: {
      featureStatusCode: ""
    },
    onSubmit: (values: FeatureProcessCreate) => {
      onSubmit(values);
    }
  });

  return (
      <>
        <TabPanel>
          <Tab selected={mainTabSelected} onClick={() => {
            history.push("/")
          }}>
            Запрос функционала
          </Tab>
          <Tab selected={!mainTabSelected}>
            Статус
          </Tab>
        </TabPanel>
        <Toolbar>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave onClick={() => {
            let button = document.getElementById("feature-process-save");
            if (button) {
              button.click();
            }
          }}/>
          <ToolbarButtonEdit onClick={() => history.push(`/${featureId}/edit`)}/>
          <ToolbarButtonDelete/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase onClick={() => history.goBack()}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </Toolbar>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <Label>Статус</Label>
            <select 
                name="featureStatusCode" 
                value={formik.values.featureStatusCode}
                onChange={formik.handleChange}
            >
              <option value={undefined}></option>
              {statusOptions ? statusOptions.map(option => {
                return <option key={option.value} value={option.value}>{option.name}</option>
              }) : null}
            </select>
          </FormField>
          <FormField>
            <input type="submit" id="feature-process-save" hidden={true}/>
          </FormField>
        </Form>
      </>
  );
}

export default FeatureProcessCreatePage;