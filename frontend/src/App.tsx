import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignIn } from './components/pages/SignIn';
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
        <Route exact path="/sign_in">
          <SignIn/>
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
