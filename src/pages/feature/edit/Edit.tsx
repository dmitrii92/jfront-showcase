import React, {useContext, useEffect, useState} from "react";
import {Form} from "jfront-components";
import {FormField} from "jfront-components";
import Label from "../../../components/label";
import Input from "../../../components/input";
import {getFeature, updateFeature} from "../../../api/feature/FeatureApi";
import {Feature, FeatureUpdate} from "../../../api/feature/FeatureInterface";
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
  ToolbarSplitter,
} from "jfront-components";
import {Tab, TabPanel} from "jfront-components";
import {SearchContext} from "../../../context";
import {useFormik} from "formik";

const EditPage = () => {
  const history = useHistory();
  let {featureId} = useParams();
  const searchContext = useContext(SearchContext);
  const [currentFeature, setCurrentFeature] = useState<Feature>();

  const onSubmit = (data: FeatureUpdate) => {
    console.log(data)
    console.log("data.featureName" + data.featureName)
    if (featureId) {
      updateFeature(featureId.toString(), data).then(() => {
        history.push(`/${featureId}/detail`);
      })
    }
  };

  useEffect(() => {
    getFeature(featureId).then(feature => {
          setCurrentFeature(feature);
        }
    );
  }, []);

  const formik = useFormik<FeatureUpdate>({
    initialValues: {
      featureName: "",
      featureNameEn: "",
    },
    onSubmit: (values: FeatureUpdate) => {
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
          <ToolbarButtonSave onClick={() => {
            let button = document.getElementById("edit-submit");
            if (button) {
              button.click();
            }
          }}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete/>
          <ToolbarButtonView onClick={() => history.push(`/${featureId}/detail`)}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase onClick={() => {
            let searchId = searchContext?.getSearch();
            history.push(`/list/${searchId}/?pageSize=25&page=1`)
          }}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </Toolbar>
        <Form id="edit-form" onSubmit={formik.handleSubmit}>
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
            <Input
                style={{width: "350px", textAlign: "left"}}
                defaultValue={currentFeature?.featureName}
                name="featureName"
                value={formik.values.featureNameEn}
                onChange={formik.handleChange}
            />
          </FormField>
          <FormField>
            <Label>Наименование английское:</Label>
            <Input
                style={{width: "350px", textAlign: "left"}}
                defaultValue={currentFeature?.featureNameEn}
                name="featureNameEn"
                value={formik.values.featureNameEn}
                onChange={formik.handleChange}
            />
          </FormField>
          <FormField>
            <Label>Дата создания:</Label>
            <Label style={{
              width: "350px",
              textAlign: "left"
            }}>{currentFeature?.dateIns.toString()}</Label>
          </FormField>
          <FormField>
            <Label>Описание:</Label>
            <Input
                style={{width: "350px", textAlign: "left"}}
                defaultValue={currentFeature?.description}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
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
            <Label style={{
              width: "350px",
              textAlign: "left"
            }}>{currentFeature?.responsible.name}</Label>
          </FormField>
          <FormField>
            <Input id="edit-submit" type="submit" hidden={true}/>
          </FormField>
        </Form>
      </>
  );
}

export default EditPage;