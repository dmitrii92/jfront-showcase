import React, {useEffect, useState} from "react";
import {Feature} from "../../api/FeatureInterface";
import ToolbarBase from "../../components/toolbar/ToolbarBase";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../components/toolbar/buttons";
import {useHistory, useParams, useLocation} from "react-router-dom";
import {getResultSetSize, searchFeatures} from "../../api/FeatureApi";

import Table, {TableColumn, TableHeader, TableHeaderCell, TableRow, TableBody} from "../../components/table";
import {TablePagingBar} from "../../components/table/TablePagingBar";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const ListPage = () => {
  const history = useHistory();
  const location = useLocation();
  let {searchId} = useParams();
  let query = useQuery();
  const [searchSize, setSearchSize] = useState<number>(25);
  const pageSize: number = parseInt(query.get("pageSize") as string);
  const page: number = parseInt(query.get("page") as string);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [currentFeature, setCurrentFeature] = useState<Feature>();


  useEffect(() => {
    if (searchId) {
      getResultSetSize(searchId).then(resultSize => {
            setSearchSize(resultSize);
            if (searchId) {
              searchFeatures(searchId, pageSize, page).then((features) => {
                setFeatures(features);
              });
            }
          }
      );
    }
  }, [location]);

  return (
      <div>
        <ToolbarBase>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={!currentFeature} onClick={() => history.push(`/edit/${currentFeature?.featureId}`)}/>
          <ToolbarButtonDelete disabled={!currentFeature}/>
          <ToolbarButtonView disabled={!currentFeature} onClick={() => history.push(`/detail/${currentFeature?.featureId}`)}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase disabled={true}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Идентификатор</TableHeaderCell>
                <TableHeaderCell>Порядок выполнения</TableHeaderCell>
                <TableHeaderCell>Статус</TableHeaderCell>
                <TableHeaderCell>Наименование</TableHeaderCell>
                <TableHeaderCell>Наименование английское</TableHeaderCell>
                <TableHeaderCell>Описание</TableHeaderCell>
                <TableHeaderCell>Дата создания</TableHeaderCell>
                <TableHeaderCell>Автор</TableHeaderCell>
                <TableHeaderCell>Ответственный</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
            {features? features.map(feature => {
              return (
                  <TableRow
                      key={feature.featureId}
                      selected={feature === currentFeature}
                      onClick={() => {
                        setCurrentFeature(feature)
                      }}
                      onDoubleClick={() => {
                        history.push(`/detail/${feature.featureId}`);
                      }}
                  >
                    <TableColumn label="Идентификатор">{feature.featureId}</TableColumn>
                    <TableColumn label="Порядок выполнения"></TableColumn>
                    <TableColumn label="Статус">{feature.featureStatus.name}</TableColumn>
                    <TableColumn label="Наименование">{feature.featureName}</TableColumn>
                    <TableColumn label="Наименование английское">{feature.featureNameEn}</TableColumn>
                    <TableColumn label="Описание">{feature.description}</TableColumn>
                    <TableColumn label="Дата создания">{feature.dateIns}</TableColumn>
                    <TableColumn label="Автор">{feature.author.name}</TableColumn>
                    <TableColumn label="Ответственный">{feature.responsible.name}</TableColumn>
                  </TableRow>
              );
            }) : null}
            </TableBody>
          </Table>
          <TablePagingBar maxRowCount={searchSize} visibleRowCount={pageSize} onChange={((pageNumber, pageSize) => {
            history.push({pathname: `/list/${searchId}`, search: `?page=${pageNumber}&pageSize=${pageSize}`})
          })}/>
        </div>
      </div>
  );
}

export default ListPage;