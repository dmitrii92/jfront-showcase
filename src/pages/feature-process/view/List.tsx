import React, {useEffect, useState} from "react";
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonFind,
  ToolbarButtonView,
  ToolbarSplitter
} from "jfront-components";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {Tab, TabPanel} from "jfront-components";
import {
  JepGrid as Grid,
  JepGridTable as Table,
  JepGridHeaderCell as TableHeaderCell,
  JepGridHeader as TableHeader,
  JepGridBody as TableBody,
  JepGridRow as TableRow,
  JepGridRowCell as TableColumn,
} from "jfront-components";
import {FeatureProcess} from "../../../api/feature-process/FeatureProcessInterface";
import {
  deleteFeatureProcess,
  findFeatureProcess
} from "../../../api/feature-process/FeatureProcessApi";
import {useTranslation} from "react-i18next";

const FeatureProcessListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(false);
  const [featureProcesses, setFeatureProcesses] = useState<FeatureProcess[]>();
  const [current, setCurrent] = useState<FeatureProcess>();
  let {featureId} = useParams();
  const {t} = useTranslation();

  const find = () => {
    if (featureId) {
      findFeatureProcess(parseInt(featureId)).then((processes: FeatureProcess[]) => {
        setFeatureProcesses(processes);
      })
    }
  }

  useEffect(() => {
    find()
  }, [location]);

  return (
      <>
        <TabPanel>
          <Tab selected={mainTabSelected} onClick={() => {
            setMainTabSelected(true)
            history.push(`/${featureId}/detail`);
          }}>
            {t("feature.header")}
          </Tab>
          <Tab selected={!mainTabSelected} onClick={() => {
            setMainTabSelected(false);
          }}>
            {t("feature-process.header")}
          </Tab>
        </TabPanel>
        <Toolbar>
          <ToolbarButtonCreate
              onClick={() => history.push(`/${featureId}/feature-process/create`)}/>
          <ToolbarButtonDelete disabled={!current} onClick={() => {
            if (current?.featureId && current.featureProcessId) {
              deleteFeatureProcess(current?.featureId, current?.featureProcessId).then(() => {
                find();
              });
            }
          }}/>
          <ToolbarButtonView disabled={!current}
                             onClick={() => history.push(`/${current?.featureId}/feature-process/${current?.featureProcessId}/detail`)}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase disabled={true}>{t("toolbar.list")}</ToolbarButtonBase>
          <ToolbarButtonFind disabled={true}
                             onClick={() => history.push(`/${featureId}/feature-process/search`)}/>
          <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
        </Toolbar>
        <Grid>
          <Table>
            <TableHeader>
                <TableHeaderCell>{t("feature-process.featureStatusName")}</TableHeaderCell>
                <TableHeaderCell>{t("feature-process.dateIns")}</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {featureProcesses ? featureProcesses.map(featureProcess => {
                return (
                    <TableRow
                        key={featureProcess.featureProcessId}
                        selected={featureProcess === current}
                        onClick={() => {
                          setCurrent(featureProcess)
                        }}
                        onDoubleClick={() => {
                          history.push(`/${featureProcess.featureId}/feature-process/${featureProcess.featureProcessId}/detail`);
                        }}
                    >
                      <TableColumn label={t("feature-process.featureStatusName")}>{featureProcess.featureStatusName}</TableColumn>
                      <TableColumn label={t("feature-process.dateIns")}>{featureProcess.dateIns}</TableColumn>
                    </TableRow>
                );
              }) : null}
            </TableBody>
          </Table>
        </Grid>
      </>
  );
}

export default FeatureProcessListPage;