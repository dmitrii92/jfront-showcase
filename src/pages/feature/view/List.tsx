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
import {useTranslation} from "react-i18next";

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
  const {t} = useTranslation();

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
              {t("feature.header")}
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
            <ToolbarButtonBase disabled={true}>{t("toolbar.list")}</ToolbarButtonBase>
            <ToolbarButtonFind onClick={() => history.push(`/`)}/>
            <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
          </Toolbar>
        </Header>
        <Content>
          <Grid>
            <Table>
              <TableHeader>
                  <TableHeaderCell>{t("feature.fields.featureId")}</TableHeaderCell>
                  <TableHeaderCell>{t("feature.fields.workSequence")}</TableHeaderCell>
                  <TableHeaderCell>{t("feature.fields.featureStatus")}</TableHeaderCell>
                  <TableHeaderCell>{t("feature.fields.featureName")}</TableHeaderCell>
                  <TableHeaderCell>{t("feature.fields.featureNameEn")}</TableHeaderCell>
                  <TableHeaderCell>{t("feature.fields.description")}</TableHeaderCell>
                  <TableHeaderCell>{t("feature.fields.dateIns")}</TableHeaderCell>
                  <TableHeaderCell>{t("feature.fields.author")}</TableHeaderCell>
                  <TableHeaderCell>{t("feature.fields.responsible")}</TableHeaderCell>
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
                        <TableColumn label={t("feature.fields.featureId")}>{feature.featureId}</TableColumn>
                        <TableColumn label={t("feature.fields.workSequence")}></TableColumn>
                        <TableColumn label={t("feature.fields.featureStatus")}>{feature.featureStatus.name}</TableColumn>
                        <TableColumn label={t("feature.fields.featureName")}>{feature.featureName}</TableColumn>
                        <TableColumn
                            label={t("feature.fields.featureNameEn")}>{feature.featureNameEn}</TableColumn>
                        <TableColumn label={t("feature.fields.description")}>{feature.description}</TableColumn>
                        <TableColumn label={t("feature.fields.dateIns")}>{feature.dateIns}</TableColumn>
                        <TableColumn label={t("feature.fields.author")}>{feature.author.name}</TableColumn>
                        <TableColumn label={t("feature.fields.responsible")}>{feature.responsible.name}</TableColumn>
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