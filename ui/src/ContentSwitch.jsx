import {Route, Switch} from "react-router-dom";
import {AddArticle, AddProvider, ListArticles, ListProviders} from "./pages";

export const ContentSwitch = () =>
    <Switch>
        <Route exact path="/">
            <ListProviders/>
        </Route>
        <Route exact path="/articles">
            <ListArticles/>
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
    </Switch>;
