import React, {useEffect, useState} from "react";
import Form from "../../../components/form";
import FormField from "../../../components/form-field";
import Label from "../../../components/label";
import Input from "../../../components/input";
import {getFeature, updateFeature} from "../../../api/FeatureApi";
import {Feature, FeatureUpdate} from "../../../api/FeatureInterface";
import {useHistory, useParams} from "react-router-dom";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../../components/toolbar/buttons";
import ToolbarBase from "../../../components/toolbar/ToolbarBase";
import {useForm} from "react-hook-form";

const EditPage = () => {
  const history = useHistory();
  let {id} = useParams();

  const [currentFeature, setCurrentFeature] = useState<Feature>();

  const {register, handleSubmit} = useForm<FeatureUpdate>();

  const onSubmit = handleSubmit((data: FeatureUpdate) => {
    console.log(data)
    console.log("data.featureName" + data.featureName)
    if (id) {
      updateFeature(id.toString(), data).then(() => {
        history.push(`/detail/${id}`);
      })
    }
  });

  useEffect(() => {
    getFeature(id).then(feature => {
          setCurrentFeature(feature);
        }
    );
  }, []);

  return (
      <div>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave onClick={() => {
            let button = document.getElementById("edit-submit");
            if (button) {
              button.click();
            }
          }}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete/>
          <ToolbarButtonView onClick={() => history.goBack()}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Form id="edit-form" onSubmit={onSubmit}>
          <FormField>
            <Label>Идентификатор:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureId}</Label>
          </FormField>
          <FormField>
            <Label>Статус:</Label>
            <Input style={{width: "350px", textAlign: "left"}} value={currentFeature?.featureStatus.name}/>
          </FormField>
          <FormField>
            <Label>Наименование:</Label>
            <Input
                style={{width: "350px", textAlign: "left"}}
                defaultValue={currentFeature?.featureName}
                name="featureName" ref={register}
            />
          </FormField>
          <FormField>
            <Label>Наименование английское:</Label>
            <Input
                style={{width: "350px", textAlign: "left"}}
                defaultValue={currentFeature?.featureNameEn}
                name="featureNameEn" ref={register}
            />
          </FormField>
          <FormField>
            <Label>Дата создания:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.dateIns.toString()}</Label>
          </FormField>
          <FormField>
            <Label>Описание:</Label>
            <Input
                style={{width: "350px", textAlign: "left"}}
                defaultValue={currentFeature?.description}
                name="description" ref={register}
            />
          </FormField>
          <FormField>
            <Label>Автор:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.author.name}</Label>
          </FormField>
          <FormField>
            <Label>Порядок выполнения:</Label>
            <Label/>
          </FormField>
          <FormField>
            <Label>Ответственный:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.responsible.name}</Label>
          </FormField>
          <FormField>
            <Input id="edit-submit" type="submit" hidden={true}/>
          </FormField>
        </Form>
      </div>
  );
}

export default EditPage;