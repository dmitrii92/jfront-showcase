import React, {useEffect, useState} from "react";
import {Feature} from "../../../api/feature/FeatureInterface";
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
import {useHistory, useLocation, useParams} from "react-router-dom";
import {deleteFeature, getResultSetSize, searchFeatures} from "../../../api/feature/FeatureApi";
import {
  JepGrid as Grid,
  JepGridTable as Table,
  JepGridHeaderCell as TableHeaderCell,
  JepGridHeader as TableHeader,
  JepGridBody as TableBody,
  JepGridRow as TableRow,
  JepGridRowCell as TableColumn,
  JepGridPagingBar,
} from "jfront-components";
import {Page, Content, Header} from "jfront-components";
import {Tab, TabPanel} from "jfront-components";

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

  const find = () => {
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
  }

  useEffect(() => {
    find();
  }, [location]);

  return (
      <Page>
        <Header>
          <TabPanel>
            <Tab selected={true}>
              Запрос функционала
            </Tab>
          </TabPanel>
          <Toolbar>
            <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
            <ToolbarButtonSave disabled={true}/>
            <ToolbarButtonEdit disabled={!currentFeature}
                               onClick={() => history.push(`/${currentFeature?.featureId}/edit`)}/>
            <ToolbarButtonDelete disabled={!currentFeature} onClick={() => {
              if (currentFeature) {
                deleteFeature(currentFeature.featureId.toString()).then(() => {
                  find();
                });
              }
            }}/>
            <ToolbarButtonView disabled={!currentFeature}
                               onClick={() => history.push(`/${currentFeature?.featureId}/detail`)}/>
            <ToolbarSplitter/>
            <ToolbarButtonBase disabled={true}>Список</ToolbarButtonBase>
            <ToolbarButtonFind onClick={() => history.push(`/`)}/>
            <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
          </Toolbar>
        </Header>
        <Content>
          <Grid>
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
                {features ? features.map(feature => {
                  return (
                      <TableRow
                          key={feature.featureId}
                          selected={feature === currentFeature}
                          onClick={() => {
                            setCurrentFeature(feature)
                          }}
                          onDoubleClick={() => {
                            history.push(`/${feature.featureId}/detail`);
                          }}
                      >
                        <TableColumn label="Идентификатор">{feature.featureId}</TableColumn>
                        <TableColumn label="Порядок выполнения"></TableColumn>
                        <TableColumn label="Статус">{feature.featureStatus.name}</TableColumn>
                        <TableColumn label="Наименование">{feature.featureName}</TableColumn>
                        <TableColumn
                            label="Наименование английское">{feature.featureNameEn}</TableColumn>
                        <TableColumn label="Описание">{feature.description}</TableColumn>
                        <TableColumn label="Дата создания">{feature.dateIns}</TableColumn>
                        <TableColumn label="Автор">{feature.author.name}</TableColumn>
                        <TableColumn label="Ответственный">{feature.responsible.name}</TableColumn>
                      </TableRow>
                  );
                }) : null}
              </TableBody>
            </Table>
            <JepGridPagingBar
                rowCount={pageSize}
                totalRowCount={searchSize}
                onRefresh={(pageNumber, pageSize) => {
                  history.push({
                    pathname: `/list/${searchId}`,
                    search: `?page=${pageNumber}&pageSize=${pageSize}`
                  })
                }}
            />
          </Grid>
        </Content>
      </Page>
  );
}

export default ListPage;