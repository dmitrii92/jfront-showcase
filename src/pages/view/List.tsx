import React from "react";
import {Feature} from "../../api/FeatureInterface";
import Header from "../../components/header";
import ToolbarBase from "../../components/toolbar/ToolbarBase";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView
} from "../../components/toolbar/buttons";
import {useHistory} from "react-router-dom";

interface FeatureListInterface {
  features: Feature[]
}

const ListPage: React.FC<FeatureListInterface> = (props) => {
  const history = useHistory();

  return (
      <div>
        <Header>Header</Header>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView/>
          <ToolbarButtonFind/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <div>
          <table>
            <thead>
            <tr>
              <th>Идентификатор</th>
              <th>Порядок выполнения</th>
              <th>Статус</th>
              <th>Наименование</th>
              <th>Наименование английское</th>
              <th>Описание</th>
              <th>Дата создания</th>
              <th>Автор</th>
              <th>Ответственный</th>
            </tr>
            </thead>
            <tbody>
            {props.features.map(feature => {
              return (
                  <tr>
                    <td>{feature.featureId}</td>
                    <td></td>
                    <td>{feature.featureStatus.name}</td>
                    <td>{feature.featureName}</td>
                    <td>{feature.featureNameEn}</td>
                    <td>{feature.description}</td>
                    <td>{feature.dateIns}</td>
                    <td>{feature.author}</td>
                    <td>{feature.responsible.name}</td>
                  </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default ListPage;