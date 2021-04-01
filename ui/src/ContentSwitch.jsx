import {Route, Switch} from "react-router-dom";
import {AddProvider, ListProviders} from "./pages";

export const ContentSwitch = () =>
    <Switch>
        <Route exact path="/">
            <ListProviders/>
        </Route>
        <Route exact path="/providers">
            <ListProviders/>
        </Route>
        <Route exact path="/providers/add">
            <AddProvider/>
        </Route>
    </Switch>;
