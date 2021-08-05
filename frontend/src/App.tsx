import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignUp } from './components/pages/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SignUp/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
