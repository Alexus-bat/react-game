import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { GAME_CONFIG } from '../../constants';
import Footer from './Footer';
import Game from './Game';
import { ScorePage } from './ScorePage';

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <>
            <Switch>
                <Route path="/game/easy" exact>
                    {/* <Game config={GAME_CONFIG.easy} name="easy" /> */}
                </Route>
                <Route path="/game/medium" exact>
                    {/* <Game config={GAME_CONFIG.medium} name="medium" /> */}
                </Route>
                <Route path="/game/hard" exact>
                    {/* <Game config={GAME_CONFIG.hard} name="hard" /> */}
                </Route>
                <Route path="/score" exact>
                    <ScorePage />
                </Route>
                <Redirect to="/game/easy"></Redirect>
            </Switch>
            <Footer />
            </>
        )
    }
}
