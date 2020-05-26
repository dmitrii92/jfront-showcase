import React, {useEffect, useState} from "react";
import ToolbarButtonBase, {
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonFind,
  ToolbarButtonView,
  ToolbarSplitter
} from "../../../components/toolbar/buttons";
import ToolbarBase from "../../../components/toolbar/ToolbarBase";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {Tab, TabPanel} from "../../../components/tabpanel/TabPanel";
import Table, {
  TableBody,
  TableColumn,
  TableHeader,
  TableHeaderCell,
  TableRow
} from "../../../components/table";
import {FeatureProcess} from "../../../api/feature-process/FeatureProcessInterface";
import {
  deleteFeatureProcess,
  findFeatureProcess
} from "../../../api/feature-process/FeatureProcessApi";

const FeatureProcessListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(false);
  const [featureProcesses, setFeatureProcesses] = useState<FeatureProcess[]>();
  const [current, setCurrent] = useState<FeatureProcess>();
  let {featureId} = useParams();

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
      <div>
        <TabPanel>
          <Tab selected={mainTabSelected} onClick={() => {
            setMainTabSelected(true)
            history.push(`/${featureId}/detail`);
          }}>
            Запрос функционала
          </Tab>
          <Tab selected={!mainTabSelected} onClick={() => {
            setMainTabSelected(false);
          }}>
            Статус
          </Tab>
        </TabPanel>
        <ToolbarBase>
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
          <ToolbarButtonBase disabled={true}>Список</ToolbarButtonBase>
          <ToolbarButtonFind disabled={true} onClick={() => history.push(`/${featureId}/feature-process/search`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Статус</TableHeaderCell>
              <TableHeaderCell>Дата создания</TableHeaderCell>
            </TableRow>
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
                    <TableColumn label="Статус">{featureProcess.featureStatusName}</TableColumn>
                    <TableColumn label="Дата создания">{featureProcess.dateIns}</TableColumn>
                  </TableRow>
              );
            }) : null}
          </TableBody>
        </Table>
      </div>
  );
}

export default FeatureProcessListPage;