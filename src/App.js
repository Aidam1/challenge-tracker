import React, { useContext } from 'react';
import SpinnerLoader from './components/SpinnerLoader/SpinnerLoader';
import Table from './components/Table/Table';
import Admin from './components/Admin/Admin';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { StateContext } from './providers/StateProvider';

function App() {
  const { isLoading } = useContext(StateContext);

  const loader = <SpinnerLoader />
  const content = (
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
  )

  return (
    <div>
      {isLoading ? loader : content}
    </div>
  );
}

export default App;