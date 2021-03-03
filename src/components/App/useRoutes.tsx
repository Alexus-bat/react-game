import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { GAME_CONFIG } from '../../constants';
import { AuthPage } from './AuthPage';
import Game from './Game';
import { ScorePage } from './ScorePage';

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/game/easy" exact>
                    <Game config={GAME_CONFIG.easy} />
                </Route>
                <Route path="/game/medium" exact>
                    <Game config={GAME_CONFIG.medium} />
                </Route>
                <Route path="/game/hard" exact>
                    <Game config={GAME_CONFIG.hard} />
                </Route>
                <Route path="/score" exact>
                    <ScorePage />
                </Route>
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
