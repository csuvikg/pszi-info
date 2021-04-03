import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import reportWebVitals from "./reportWebVitals";
import {MuiPickersUtilsProvider} from "@material-ui/pickers"
import DayJs from "@date-io/dayjs"
import {Provider} from "react-redux";
import {store} from "./services/store";


ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={DayJs}>
            <App title="Ellátótérkép"/>
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
