import React from "react";
import Header from "../../components/header";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView
} from "../../components/toolbar/buttons";
import ToolbarBase from "../../components/toolbar/ToolbarBase";
import {useHistory} from "react-router-dom";
import Form from "../../components/form";
import FormField from "../../components/form-field";
import Label from "../../components/label";
import Input from "../../components/input";
import {useForm} from "react-hook-form";
import {getResultSetSize, postSearchRequest} from "../../api/FeatureApi";
import {SearchRequest} from "../../api/types";
import {FeatureSearchTemplate} from "../../api/FeatureInterface";


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
      getResultSetSize(searchId).then(pageSize => {
        if (pageSize > 0) {
          history.push(`/list/${searchId}`)
        } else {
          alert("Search empty!")
        }
      });
    });

  });

  return (
      <div>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarButtonFind disabled={true}/>
          <ToolbarButtonBase type="submit" form="main-form">Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Form id="main-form" onSubmit={onSubmit}>
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
        </Form>
      </div>
  );
}

export default SearchPage;