import React from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import { useRoutes } from './useRoutes';

const App: React.FC = () => {
    const routes = useRoutes(true);
    return (
        <>
            <Router>
            <nav className="nav">
                <ul>
                    <li>
                        <a href="/game/easy">Легко</a>
                        {/* <NavLink to="/game/easy">
                            Easy
                        </NavLink> */}
                    </li>
                    <li>
                        <a href="/game/medium">Средне</a>
                        {/* <NavLink to="/game/medium">
                            medium
                        </NavLink> */}
                    </li>
                    <li>
                        <a href="/game/hard">Сложно</a>
                        {/* <NavLink to="/game/hard">
                            hard
                        </NavLink> */}
                    </li>
                </ul>
            </nav>
                <div>
                    {routes}
                </div>
            </Router>
        </>
    )
}

export default App;
