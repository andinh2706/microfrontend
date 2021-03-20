import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";


const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});


// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

const MarketingLazy = React.lazy(() => import("./components/MarketingApp"));
const AuthLazy = React.lazy(() => import("./components/AuthApp"));
const DashboardLazy = React.lazy(() => import("./components/DashboardApp"));
const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    if(isSignedIn){
      history.push("/dashboard");
    }
  }, [isSignedIn]);
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
          <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
          <React.Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth">
                  <AuthLazy 
                  onSignIn={() => setIsSignedIn(true)} 
                  onSignOut={() => setIsSignedIn(false)} 
                  />
                </Route>
                <Route path="/dashboard">
                {
                  isSignedIn ? 
                  <DashboardLazy /> :
                  <Redirect to="/auth/signin"/>
                }
                </Route>
                <Route path="/" component={MarketingLazy}/>
              </Switch>
          </React.Suspense>
      </StylesProvider>
    </Router>
  );
};
