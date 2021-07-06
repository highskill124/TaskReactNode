import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages
const Tasks = React.lazy(() => import('./views/pages/tasks/Tasks'));

class App extends Component {
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/" name="Tasks" render={props => <Tasks {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
