import React from 'react';
import {NavLink, BrowserRouter as Router} from 'react-router-dom';
import Game from './Game';
import Footer from './Footer';
import { useRoutes } from './useRoutes';

const App: React.FC = () => {
    const routes = useRoutes(false);
    return (
        <Router>
            <div className="container">
                {routes}
            </div>
        </Router>
        // <Ro>
        //     <Game />
        //     <Footer />
        // </Ro>
    )
}

export default App;
