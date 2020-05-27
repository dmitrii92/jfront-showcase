import React, {useState} from 'react';

import DetailPage from "./pages/feature/view/Detail";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CreatePage from "./pages/feature/create/Create";
import SearchPage from "./pages/feature/search/Search";
import ListPage from "./pages/feature/view/List";
import EditPage from "./pages/feature/edit/Edit";
import FeatureProcessListPage from "./pages/feature-process/view/List";
import FeatureProcessDetailPage from "./pages/feature-process/view/Detail";
import FeatureProcessCreatePage from "./pages/feature-process/create/Create";
import {SearchContext, SearchContextInterface} from './context';

function App() {

  const [searchId, setSearchId] = useState<string>("");

  const searchFeature: SearchContextInterface = {
    getSearch(): string {
      return searchId;
    },
    setSearch(searchId: string) {
      setSearchId(searchId);
    }
  }

  return (
      <div className="App">
        <SearchContext.Provider value={searchFeature}>
          <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
            <Switch>
              <Route path="/" exact component={SearchPage}/>
              <Route path="/create" exact component={CreatePage}/>
              <Route path="/:featureId/edit" exact component={EditPage}/>
              <Route path="/:featureId/detail" component={DetailPage}/>
              <Route path="/list/:searchId" component={ListPage}/>
              <Route path="/:featureId/feature-process" exact component={FeatureProcessListPage}/>
              <Route path="/:featureId/feature-process/:featureProcessId/detail"
                     component={FeatureProcessDetailPage}/>
              <Route path="/:featureId/feature-process/create" exact
                     component={FeatureProcessCreatePage}/>
            </Switch>
          </BrowserRouter>
        </SearchContext.Provider>
      </div>
  );
}

export default App;
