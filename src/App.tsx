import React, {useState} from 'react';

import DetailPage from "./pages/view/Detail";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CreatePage from "./pages/create/Create";
import SearchPage from "./pages/search/Search";
import ListPage from "./pages/view/List";
import Header from "./components/header";
import EditPage from "./pages/edit/Edit";

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
