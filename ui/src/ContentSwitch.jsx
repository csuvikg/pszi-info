import {Route, Switch} from "react-router-dom";
import {AddArticle, AddProvider, ListProviders} from "./pages";
import {PageViewLogger} from "./loggers/PageViewLogger";

export const ContentSwitch = () =>
    <Switch>
        <Route exact path="/">
            <ListProviders/>
        </Route>
        <Route exact path="/articles/add">
            <AddArticle/>
        </Route>
        <Route exact path="/providers">
            <ListProviders/>
        </Route>
        <Route exact path="/providers/add">
            <AddProvider/>
        </Route>
        <PageViewLogger/>
    </Switch>;
