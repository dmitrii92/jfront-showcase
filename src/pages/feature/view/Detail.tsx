import React, {useContext, useEffect, useState} from "react";
import {Form} from "jfront-components";
import {FormField} from "jfront-components";
import Label from "../../../components/label";
import {deleteFeature, getFeature} from "../../../api/feature/FeatureApi";
import {Feature} from "../../../api/feature/FeatureInterface";
import {useHistory, useParams} from "react-router-dom";
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
import {Tab, TabPanel} from "jfront-components";
import {SearchContext} from "../../../context";

const DetailPage = () => {
  const history = useHistory();
  let {featureId} = useParams();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(true);
  const [currentFeature, setCurrentFeature] = useState<Feature>();
  const searchContext = useContext(SearchContext);

  useEffect(() => {
    getFeature(featureId).then(feature => {
          setCurrentFeature(feature);
        }
    );
  }, []);

  return (
      <div>
        <TabPanel>
          <Tab selected={mainTabSelected} onClick={() => {
            setMainTabSelected(true)
          }}>
            Запрос функционала
          </Tab>
          <Tab selected={!mainTabSelected} onClick={() => {
            setMainTabSelected(false);
            history.push(`/${featureId}/feature-process`);
          }}>
            Статус
          </Tab>
        </TabPanel>
        <Toolbar>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit onClick={() => history.push(`/${featureId}/edit`)}/>
          <ToolbarButtonDelete onClick={() => {
            if (featureId) {
              deleteFeature(featureId).then(() => {
                let searchId = searchContext?.getSearch();
                if (searchId) {
                  history.push(`/list/${searchId}/?pageSize=25&page=1`)
                } else {
                  history.push(`/`);
                }
              });
            }
          }}/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase onClick={() => {
            let searchId = searchContext?.getSearch();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`)
            } else {
              history.push("/");
            }
          }}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </Toolbar>
        <Form>
          <FormField>
            <Label>Идентификатор:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureId}</Label>
          </FormField>
          <FormField>
            <Label>Статус:</Label>
            <Label style={{
              width: "350px",
              textAlign: "left"
            }}>{currentFeature?.featureStatus.name}</Label>
          </FormField>
          <FormField>
            <Label>Наименование:</Label>
            <Label style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureName}</Label>
          </FormField>
          <FormField>
            <Label>Наименование английское:</Label>
            <Label
                style={{width: "350px", textAlign: "left"}}>{currentFeature?.featureNameEn}</Label>
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
            <Label style={{
              width: "350px",
              textAlign: "left"
            }}>{currentFeature?.responsible.name}</Label>
          </FormField>
        </Form>
      </div>
  );
}

export default DetailPage;