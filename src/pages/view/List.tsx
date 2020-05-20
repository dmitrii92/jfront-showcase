import React, {useEffect, useLayoutEffect, useState} from "react";
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
import {ListItem} from "./ListItem";

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
  console.log("SEARCH_SIZE = " + searchSize)
  console.log("QUERY pageSize = " + pageSize)
  console.log("QUERY pageSize = " + query.get("pageSize"))
  console.log("QUERY page = " + page)
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    console.log("useEffect List")
    console.log(searchId)
    if (searchId) {
      console.log("searchId")
      getResultSetSize(searchId).then(resultSize => {
            console.log(resultSize)
            setSearchSize(resultSize);
            // searchSize = resultSize;
            console.log(searchSize)
            if (searchId) {
              searchFeatures(searchId, pageSize, page).then((features) => {
                console.log(features)
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
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView/>
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
                      onClick={() => console.log("onClick")}
                      onDoubleClick={() => {
                        console.log("onDoubleClick")
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
            console.log("pageNumber = " + pageNumber)
            console.log("pageSize = " + pageSize)
            history.push({pathname: `/list/${searchId}`, search: `?page=${pageNumber}&pageSize=${pageSize}`})
          })}/>
        </div>
      </div>
  );
}

export default ListPage;