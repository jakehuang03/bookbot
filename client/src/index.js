import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";



const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId="401905550825-3evij7gugc3cne4hg23p8s4lub8h6d3c.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
