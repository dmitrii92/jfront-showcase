import React, {useEffect, useState} from "react";
import Toolbar from "../../components/toolbar";
import Form from "../../components/form";
import Header from "../../components/header";
import FormField from "../../components/form-field";
import Label from "../../components/label";
import Button from "../../components/button";
import {getFeature} from "../../api/FeatureApi";
import {Feature} from "../../api/FeatureInterface";
import { useParams } from "react-router-dom";

const DetailPage = () => {

  let {id} = useParams();

  const [currentFeature, setCurrentFeature] = useState<Feature>();

  useEffect(() => {
    getFeature(id).then(feature => {
          console.log(feature);
          setCurrentFeature(feature);
        }
    );
  }, []);

  return (
      <div>
        <Header>Header</Header>
        <Toolbar/>
        <Form>
          <FormField>
            <Label>Идентификатор:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureId}</Label>
          </FormField>
          <FormField>
            <Label>Статус:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureStatus.name}</Label>
          </FormField>
          <FormField>
            <Label>Наименование:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureName}</Label>
          </FormField>
          <FormField>
            <Label>Наименование английское:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureNameEn}</Label>
          </FormField>
          <FormField>
            <Label>Дата создания:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.dateIns}</Label>
          </FormField>
          <FormField>
            <Label>Описание:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.description}</Label>
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
        </Form>
      </div>
  );
}

export default DetailPage;