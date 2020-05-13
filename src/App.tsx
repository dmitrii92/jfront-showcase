import React, {useState} from 'react';

import DetailPage from "./pages/view/Detail";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CreatePage from "./pages/create/Create";
import SearchPage from "./pages/search/Search";
import {Feature} from "./api/FeatureInterface";
import ListPage from "./pages/view/List";

function App() {

  const [features, setFeatures] = useState<Feature>();

  return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SearchPage}/>
            <Route path="/create" exact component={CreatePage}/>
            <Route path="/detail/:id" component={DetailPage}/>
            <Route path="/list" component={ListPage}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
