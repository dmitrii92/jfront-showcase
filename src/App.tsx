import React from 'react';

import DetailPage from "./pages/feature/view/Detail";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CreatePage from "./pages/feature/create/Create";
import SearchPage from "./pages/feature/search/Search";
import ListPage from "./pages/feature/view/List";
import EditPage from "./pages/feature/edit/Edit";
import FeatureProcessListPage from "./pages/feature-process/view/List";

function App() {

  return (
      <div className="App">
        <BrowserRouter basename="/feature">
          <Switch>
            <Route path="/" exact component={SearchPage}/>
            <Route path="/create" exact component={CreatePage}/>
            <Route path="/:featureId/edit" exact component={EditPage}/>
            <Route path="/:featureId/detail" component={DetailPage}/>
            <Route path="/list/:searchId" component={ListPage}/>
            <Route path="/:featureId/feature-process" component={FeatureProcessListPage}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
