import React from 'react';

import DetailPage from "./pages/view/Detail";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CreatePage from "./pages/create/Create";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={CreatePage}/>
            <Route path="/detail/:id" component={DetailPage}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
