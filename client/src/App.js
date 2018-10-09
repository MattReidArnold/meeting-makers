import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header';
import Landing from './containers/Landing/Landing';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    axios.get('/auth/current_user').then(({ data }) => {
      this.setState({ user: data });
    });
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header user={this.state.user} />
            <Switch>
              <Route exact path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
