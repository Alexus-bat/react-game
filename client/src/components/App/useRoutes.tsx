import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AuthPage from './AuthPage';
import Game from './Game';
import { ScorePage } from './ScorePage';

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/game" exact>
                    <Game />
                </Route>
                <Route path="/score" exact>
                    <ScorePage />
                </Route>
                <Redirect to="/game" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
