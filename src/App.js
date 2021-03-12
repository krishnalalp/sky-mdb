import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';
import './App.css';
import { Content, Header } from "antd/lib/layout/layout";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { Detail } from "./components/Detail/Details";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Header className="app-header">
            <Navbar />
          </Header>
          <Content className="layout-wrapper">
            <Switch>
              <Route exact path="/">
                <SearchResults />
              </Route>
              <Route path="/search">
                <SearchResults />
              </Route>
              <Route path="/movie/:id">
                <Detail resource="movie"/>
              </Route>
              <Route path="/person/:id">
                <Detail resource="person"/>
              </Route>
              <Route path="/tv/:id">
                <Detail resource="tv"/>
              </Route>                            
            </Switch>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
