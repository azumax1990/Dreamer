import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { User } from './types';
import { getCurrentUser } from './api/auth';

import { SignIn } from './components/pages/SignIn';
import { SignUp } from './components/pages/SignUp';
import { Auditions } from './components/pages/Auditions';
import { UserProfile } from './components/pages/UserProfile';
import { EditProfile } from './components/pages/EditProfile'; 
import { AuditionShow } from './components/pages/AuditionShow';
import { CreateAudition } from './components/pages/smartPhone/CreateAudition';
import { CreatePost } from './components/pages/smartPhone/CreatePost';



// ログインユーザーContextのtype型
export type LoginUserContextType = {
  loading:               boolean;
  setLoading:            Dispatch<SetStateAction<boolean>>;
  isSignedIn:            boolean;
  setIsSignedIn:         Dispatch<SetStateAction<boolean>>;
  currentUser:           User | undefined;
  setCurrentUser:        Dispatch<SetStateAction<User | undefined>>;
}
export const LoginUserContext = createContext<LoginUserContextType>({} as LoginUserContextType);

function App() {
  const [loading, setLoading]                      = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn]                = useState<boolean>(false);
  const [currentUser, setCurrentUser]              = useState<User | undefined>();

  // ログインユーザーの取得
  useEffect(() => {
    getCurrentUser()
    ?.then((res) => {
      if (res) {
        setCurrentUser(res.data.user)
      } else {
        alert("ユーザーを読み込めませんでした。")
      }
    })
    .catch(() => alert("エラー"))
  }, [setCurrentUser])
  
  return (
    <>
      <LoginUserContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/sign_up">
              <SignUp/>
            </Route>
          </Switch>
          <Route exact path="/sign_in">
            <SignIn/>
          </Route>
          <Route exact path="/auditions">
            <Auditions />
          </Route>
          <Route exact path="/audition">
            <CreateAudition />
           </Route>
          <Route 
            exact 
            path="/audition/:id"
            render={({ match }) => (
              <AuditionShow id={match.params.id}/>
            )}
           />
          <Route 
            exact 
            path="/user/:userId/profile"
            render={({ match }) => (
              <UserProfile id={match.params.userId}/>
            )}
           />
           <Route
            exact 
            path="/user/:userId/profile/edit"
            render={({ match }) => (
              <EditProfile id={match.params.userId} />
            )}
           />
           <Route exact path="/post">
            <CreatePost />
           </Route>
        </BrowserRouter>
      </LoginUserContext.Provider>
    </>
  );
}
export default App;