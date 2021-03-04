import React from 'react';
import {NavLink} from 'react-router-dom';
import { useRoutes } from './useRoutes';

const App: React.FC = () => {
    const routes = useRoutes(true);
    return (
        <>
            <nav className="nav">
                <ul>
                    <li>
                        {/* <a href="/game/easy">Легко</a> */}
                        <NavLink to={{pathname: '/game/easy', }}>
                            Easy
                        </NavLink>
                    </li>
                    <li>
                        {/* <a href="/game/medium">Средне</a> */}
                        <NavLink to="/game/medium">
                            medium
                        </NavLink>
                    </li>
                    <li>
                        {/* <a href="/game/hard">Сложно</a> */}
                        <NavLink to="/game/hard">
                            hard
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div>
                {routes}
            </div>
        </>
    )
}

export default App;
