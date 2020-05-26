import React, {useEffect, useState} from "react";
import {Tab, TabPanel} from "../../../components/tabpanel/TabPanel";
import ToolbarBase from "../../../components/toolbar/ToolbarBase";
import ToolbarButtonBase, {
  ToolbarButtonCreate, ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../../components/toolbar/buttons";
import {useHistory, useParams} from "react-router-dom";
import {
  FeatureProcess, FeatureProcessCreate,
  FeatureStatusOptions
} from "../../../api/feature-process/FeatureProcessInterface";
import Form from "../../../components/form";
import FormField from "../../../components/form-field";
import {
  ComboBox,
  ComboBoxInput,
  ComboBoxList, ComboBoxOption, ComboBoxPopup
} from "../../../components/combobox";
import {
  createFeatureProcess,
  getFeatureStatusOptions
} from "../../../api/feature-process/FeatureProcessApi";
import Label from "../../../components/label";
import {useForm} from "react-hook-form/dist/react-hook-form.ie11";

const FeatureProcessCreatePage = () => {

  const history = useHistory();
  let {featureId, featureProcessId} = useParams();
  const mainTabSelected = false;
  const [featureProcess, setFeatureProcess] = useState<FeatureProcess>();
  let [statusOptions, setStatusOptions] = useState<FeatureStatusOptions[]>();
  const {register, handleSubmit} = useForm<FeatureProcessCreate>();

  const onSubmit = handleSubmit((data: FeatureProcessCreate) => {
    console.log(data.featureStatusCode)
    if (featureId) {
      createFeatureProcess(parseInt(featureId), data).then(value => {
        history.push(`/${value.featureId}/feature-process/${value.featureProcessId}/detail`);
      });
    }
  })

      useEffect(() => {
    getFeatureStatusOptions().then((options) => {
      console.log(options);
      setStatusOptions(options);
      console.log(statusOptions);
    });
  }, [])

  return (
      <div>
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
        <ToolbarBase>
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
        </ToolbarBase>
        <Form onSubmit={onSubmit}>
          <FormField>
            <Label>Статус</Label>
            <ComboBox>
              <ComboBoxInput name="featureStatusCode"/>
              {/*<input name="featureStatusCode" ref={register()}/>*/}
              <ComboBoxPopup>
                <ComboBoxList>
                  <ComboBoxOption name="" value={undefined}/>
                  {statusOptions ? statusOptions.map(option => {
                    return <ComboBoxOption key={option.value} name={option.name} value={option.value}/>
                  }) : null}
                </ComboBoxList>
              </ComboBoxPopup>
            </ComboBox>
          </FormField>
          <FormField>
            <input type="submit" id="feature-process-save" hidden={true}/>
          </FormField>
        </Form>
      </div>
  );
}

export default FeatureProcessCreatePage;