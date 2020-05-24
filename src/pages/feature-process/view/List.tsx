import React, {useEffect, useState} from "react";
import ToolbarButtonBase, {
  ToolbarButtonCreate, ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../../components/toolbar/buttons";
import ToolbarBase from "../../../components/toolbar/ToolbarBase";
import {useHistory, useParams, useLocation} from "react-router-dom";
import {Tab, TabPanel} from "../../../components/tabpanel/TabPanel";
import Table, {
  TableBody,
  TableColumn,
  TableHeader,
  TableHeaderCell,
  TableRow
} from "../../../components/table";
import {FeatureProcess} from "../../../api/feature-process/FeatureProcessInterface";
import {findFeatureProcess} from "../../../api/feature-process/FeatureProcessApi";

const FeatureProcessListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(false);
  const [featureProcesses, setFeatureProcesses] = useState<FeatureProcess[]>();
  const [current, setCurrent] = useState<FeatureProcess>();
  let {featureId} = useParams();

  useEffect(() => {
    if (featureId) {
      findFeatureProcess(parseInt(featureId)).then((processes:FeatureProcess[]) => {
        setFeatureProcesses(processes);
      })
    }
  }, [location]);

  return (
      <div>
        <TabPanel>
          <Tab selected={mainTabSelected} onClick={() => {setMainTabSelected(true)
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
          <ToolbarButtonCreate onClick={() => history.push(`/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={!current}
                             onClick={() => history.push(`/${current?.featureId}/edit`)}/>
          <ToolbarButtonDelete disabled={!current}/>
          <ToolbarButtonView disabled={!current}
                             onClick={() => history.push(`/${current?.featureId}/detail`)}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase disabled={true}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Статус</TableHeaderCell>
              <TableHeaderCell>Дата создания</TableHeaderCell>
              <TableHeaderCell>Пользователь</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featureProcesses? featureProcesses.map(featureProcess => {
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
                    <TableColumn label="Порядок выполнения"></TableColumn>
                  </TableRow>
              );
            }) : null}
          </TableBody>
        </Table>
      </div>
  );
}

export default FeatureProcessListPage;