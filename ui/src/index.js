import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import {MuiPickersUtilsProvider} from "@material-ui/pickers"
import DayJs from "@date-io/dayjs"
import {Provider} from "react-redux";
import {store} from "./services/store";
import {FirebaseAppProvider} from "reactfire";

const firebaseConfig = {
    apiKey: "AIzaSyDdydSSTdHQE-uFyG4dwC6vtPAY88yAgu4",
    authDomain: "pszi-info.firebaseapp.com",
    databaseURL: "https://pszi-info.firebaseio.com",
    projectId: "pszi-info",
    storageBucket: "pszi-info.appspot.com",
    messagingSenderId: "209820198501",
    appId: "1:209820198501:web:e306a2b58a0aad03f5488c",
    measurementId: "G-8LYK995FCQ"
};

ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={DayJs}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <App/>
            </FirebaseAppProvider>
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
