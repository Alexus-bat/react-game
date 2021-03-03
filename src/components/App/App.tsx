import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Game from './Game';
import { useRoutes } from './useRoutes';

const App: React.FC = () => {
    const routes = useRoutes(false);
    return (
        <Router>
            <div>
                {routes}
            </div>
        </Router>
    )
}

export default App;
