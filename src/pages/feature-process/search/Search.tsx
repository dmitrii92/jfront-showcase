import React, {useState} from "react";
import {Tab, TabPanel} from "../../../components/tabpanel/TabPanel";
import ToolbarBase from "../../../components/toolbar/ToolbarBase";
import ToolbarButtonBase, {
  ToolbarButtonCreate, ToolbarButtonDelete,
  ToolbarButtonEdit, ToolbarButtonFind,
  ToolbarButtonSave, ToolbarButtonView, ToolbarSplitter
} from "../../../components/toolbar/buttons";
import {deleteFeatureProcess} from "../../../api/feature-process/FeatureProcessApi";
import {useHistory, useLocation, useParams} from "react-router-dom";

const FeatureProcessSearchPage = () => {
  const location = useLocation();
  const history = useHistory();
  const {featureId} = useParams();
  const mainTabSelected = false;

  return (
      <div>
        <TabPanel>
          <Tab selected={mainTabSelected} onClick={() => {
            history.push(`/${featureId}/detail`);
          }}>
            Запрос функционала
          </Tab>
          <Tab selected={!mainTabSelected}>
            Статус
          </Tab>
        </TabPanel>
        <ToolbarBase>
          <ToolbarButtonCreate
              onClick={() => history.push(`/${featureId}/feature-process/create`)}/>
          <ToolbarButtonSave disabled={true}/>
          <ToolbarButtonEdit disabled={true}/>
          <ToolbarButtonDelete disabled={true}/>
          <ToolbarButtonView disabled={true}/>
          <ToolbarSplitter/>
          <ToolbarButtonBase disabled={true}>Список</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/${featureId}/feature-process/search`)}/>
          <ToolbarButtonBase disabled={true}>Найти</ToolbarButtonBase>
        </ToolbarBase>
      </div>
  );
}

export default FeatureProcessSearchPage;