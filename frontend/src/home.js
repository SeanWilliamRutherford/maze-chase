import React from "react";
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  Link,
} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Maze Chase</h1>
            <li>
                <Link to={'/play'}>Start</Link>
            </li>
        </div>
    )
}

export default Home;