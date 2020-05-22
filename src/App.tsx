import React from 'react';

import DetailPage from "./pages/feature/view/Detail";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CreatePage from "./pages/feature/create/Create";
import SearchPage from "./pages/feature/search/Search";
import ListPage from "./pages/feature/view/List";
import Header from "./components/header";
import EditPage from "./pages/feature/edit/Edit";

function App() {

  return (
      <div className="App">
        <Header>Запрос функционала</Header>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SearchPage}/>
            <Route path="/create" exact component={CreatePage}/>
            <Route path="/edit/:id" exact component={EditPage}/>
            <Route path="/detail/:id" component={DetailPage}/>
            <Route path="/list/:searchId" component={ListPage}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
