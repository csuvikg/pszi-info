import {Route, Switch} from "react-router-dom";
import {AddProvider, DummyPage} from "./pages";

export const ContentSwitch = () =>
    <Switch>
        <Route exact path="/">
            <DummyPage/>
        </Route>
        <Route exact path="/providers">
            <DummyPage/>
        </Route>
        <Route exact path="/providers/add">
            <AddProvider/>
        </Route>
    </Switch>;
