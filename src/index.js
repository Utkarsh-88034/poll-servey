import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rstore from "./module/redux/Store";
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0091ea",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }    
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rstore}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <App />
          </MuiPickersUtilsProvider>
        </BrowserRouter>
      </ThemeProvider>      
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
