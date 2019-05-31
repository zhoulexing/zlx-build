import React from "react";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { getRouterData } from "./common/router";
import Authorized from "./utils/Authorized";
import { getQueryPath } from "./utils/util";

const { AuthorizedRoute } = Authorized;

const RouterConfig = ({ history, store }) => {
    const routerData = getRouterData();
    const MainLayout = routerData["/apps"].component;
    const LoginLayout = routerData["/login"].component;
    return (
        <Router history={history} store={store}>
            <Switch>
                <Redirect exact from="/" to="/apps" />
                <Route path="/login" component={ LoginLayout } />
                <AuthorizedRoute 
                    path="/apps"
                    render={ props => <MainLayout { ...props }/> }
                    authority={ ["admin"] }
                    redirectPath={ getQueryPath("/login", {
                        redirect: window.location.href
                    }) }
                />
            </Switch>
        </Router>
    )
}

export default RouterConfig;
