import React from "react";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView, ToolbarSplitter
} from "../../../components/toolbar/buttons";
import ToolbarBase from "../../../components/toolbar/ToolbarBase";
import {useHistory} from "react-router-dom";
import Form from "../../../components/form";
import FormField from "../../../components/form-field";
import Label from "../../../components/label";
import Input from "../../../components/input";
import {useForm} from "react-hook-form/dist/react-hook-form.ie11";
import {getResultSetSize, postSearchRequest} from "../../../api/feature/FeatureApi";
import {SearchRequest} from "../../../api/types";
import {FeatureSearchTemplate} from "../../../api/feature/FeatureInterface";
import {Tab, TabPanel} from "../../../components/tabpanel/TabPanel";


const SearchPage = () => {
  const history = useHistory();

  const {register, handleSubmit} = useForm<FeatureSearchTemplate>();

  const onSubmit = handleSubmit((data: FeatureSearchTemplate) => {

    if (!data.featureId) {
      data.featureId = undefined;
    }

    /*if (!data.dateInsFrom) {
      data.dateInsFrom = new Date();
      console.log(data.dateInsFrom)
    }
    if (!data.dateInsTo) {
      data.dateInsTo = new Date();
      console.log(data.dateInsTo)
    }*/

    let searchRequest: SearchRequest<FeatureSearchTemplate> = {template: data};

    postSearchRequest(searchRequest).then((searchId) => {
      getResultSetSize(searchId).then(resultSize => {
        if (resultSize > 0) {
          history.push(`/list/${searchId}/?pageSize=25&page=1`)
        } else {
          alert("Search empty!")
        }
      });
    });

  });

  return (
      <div>
        <TabPanel>
          <Tab selected={true}>
            Запрос функционала
          </Tab>
        </TabPanel>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase disabled={true}>Список</ToolbarButtonBase>
          <ToolbarButtonFind disabled={true}/>
          <ToolbarButtonBase onClick={() => {
            let button = document.getElementById("search-submit");
            if (button) {
              button.click();
            }
          }}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Form onSubmit={onSubmit}>
          <FormField>
            <Label>Идентификатор:</Label>
            <Input name="featureId" ref={register({pattern: /\d+/})} type="number"/>
          </FormField>
          <FormField>
            <Label>Наименование:</Label>
            <Input name="featureNameTemplate" ref={register}/>
          </FormField>
          <FormField>
            <Label>Наименование анлийское:</Label>
            <Input name="featureNameEnTemplate" ref={register}/>
          </FormField>
{/*          <FormField>
            <Label>Дата создания, от:</Label>
            <Input name="dateInsFrom" ref={register} type="date"/>
          </FormField>
          <FormField>
            <Label>Дата создания, до:</Label>
            <Input name="dateInsTo" ref={register} type="date"/>
          </FormField>*/}
          <FormField>
            <Input id="search-submit" type="submit" hidden={true}/>
          </FormField>
        </Form>
      </div>
  );
}

export default SearchPage;