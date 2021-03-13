import React from "react";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { Detail } from "./components/Detail/Detail";

const { Header, Content } = Layout;

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
                <Detail resource="movie" />
              </Route>
              <Route path="/person/:id">
                <Detail resource="person" />
              </Route>
              <Route path="/tv/:id">
                <Detail resource="tv" />
              </Route>
            </Switch>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
