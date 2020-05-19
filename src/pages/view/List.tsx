import React, {useEffect, useState} from "react";
import {Feature} from "../../api/FeatureInterface";
import Header from "../../components/header";
import ToolbarBase from "../../components/toolbar/ToolbarBase";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView
} from "../../components/toolbar/buttons";
import {useHistory, useParams} from "react-router-dom";
import {getResultSetSize, searchFeatures} from "../../api/FeatureApi";
import {ListItem} from "./ListItem";

import "./List.css";

const ListPage = () => {
  const history = useHistory();
  let {searchId} = useParams();
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    console.log("useEffect List")
    console.log(searchId)
    if (searchId) {
      console.log("searchId")
      getResultSetSize(searchId).then(pageSize => {
            console.log(pageSize)
            if (searchId) {
              searchFeatures(searchId, pageSize, 1).then((features) => {
                console.log(features)
                setFeatures(features);
              });

            }
          }
      );
    }
  }, []);

  return (
      <div>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView/>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
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
            {features.map(feature => {
              return (
                  <ListItem
                      key={feature.featureId}
                      {...feature}
                  />
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default ListPage;