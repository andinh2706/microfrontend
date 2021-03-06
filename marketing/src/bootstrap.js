import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

// Mount function to start up the app
const mount = (el, { defaultHistoryObject, onNavigate, initialPath = "" }) => {
  const history = defaultHistoryObject || createMemoryHistory({
    initialEntries: [initialPath]
  });

  if(onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history}/>, el);

  return {
    onHostAppNavigate: ({ pathname: nextPathname }) => {
          const { pathname: currrentPathname } = history.location;
          if(nextPathname !== currrentPathname){
            history.push(nextPathname);
          }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, {
      defaultHistoryObject: createBrowserHistory()
    });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
