import React from 'react';
import Table from './components/Table/Table';
import Admin from './components/Admin/Admin';
import UserProvider from "./providers/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Table />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;