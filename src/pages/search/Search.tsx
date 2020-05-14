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
import {getResultSetSize, postSearchRequest, searchFeatures} from "../../api/FeatureApi";
import {SearchRequest} from "../../api/types";
import {FeatureSearchTemplate} from "../../api/FeatureInterface";


const SearchPage = () => {
  const history = useHistory();
  // const [id, setId] = useState();

  const {register, handleSubmit} = useForm<FeatureSearchTemplate>();

  const onSubmit = handleSubmit((data: FeatureSearchTemplate) => {
    console.log(data);
    alert(data);

    if (typeof data.featureId === "string") {
      console.log("String!")
    } else {
      console.log("Возможно number!")
    }

    if (!data.featureId) {
      data.featureId = undefined;
    }

    console.log(data);
    let searchRequest: SearchRequest<FeatureSearchTemplate> = {template: data};
    postSearchRequest(searchRequest).then((searchId) => {
      console.log(searchId)
      getResultSetSize(searchId).then(pageSize => {
        console.log(pageSize)
        if (pageSize > 0) {
          console.log("history push")
          history.push(`/list/${searchId}`)
        }
        /*searchFeatures(searchId, pageSize, 1).then((features) => {
          console.log(features)
        });*/
      });

    });

  });

  return (
      <div>
        <Header>Header</Header>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView/>
          <ToolbarButtonFind/>
          <ToolbarButtonBase type="submit" form="main-form">Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Form id="main-form" onSubmit={onSubmit}>
          <FormField>
            <Label>Идентификатор:</Label>
            <input name="featureId" ref={register({pattern: /\d+/})} type="number"/>
            {/*<Input name="featureId" ref={register({pattern: /\d+/})} type="number"/>*/}
          </FormField>
          <FormField>
            <Label>Наименование:</Label>
            <Input name="featureNameTemplate" ref={register}/>
          </FormField>
          <FormField>
            <Label>Наименование анлийское:</Label>
            <Input name="featureNameEnTemplate" ref={register}/>
          </FormField>
          <FormField>
            <button type="submit">Поиск</button>
          </FormField>
        </Form>
      </div>
  );
}

export default SearchPage;