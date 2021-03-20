import React, { useState } from 'react';
import Header from "./components/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});


// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

const MarketingLazy = React.lazy(() => import("./components/MarketingApp"));
const AuthLazy = React.lazy(() => import("./components/AuthApp"));

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
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
                <Route path="/" component={MarketingLazy}/>
              </Switch>
          </React.Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};
