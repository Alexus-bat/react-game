import React from 'react';
import Game from './Game';
import Footer from './Footer';
// import { useRoutes } from './useRoutes';

const App: React.FC = () => {
    // const routes = useRoutes(true);
    return (
        // <>
        //     <nav className="nav">
        //         <ul>
        //             <li>
        //                 {/* <a href="/game/easy">Легко</a> */}
        //                 <NavLink to={{pathname: '/game/easy', }}>
        //                     легко
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 {/* <a href="/game/medium">Средне</a> */}
        //                 <NavLink to="/game/medium">
        //                     средне
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 {/* <a href="/game/hard">Сложно</a> */}
        //                 <NavLink to="/game/hard">
        //                     сложно
        //                 </NavLink>
        //             </li>
        //         </ul>
        //     </nav>
        //     <div>
        //         {routes}
        //     </div>
        // </>
        <>
            <Game />
            <Footer />
        </>
    )
}

export default App;
