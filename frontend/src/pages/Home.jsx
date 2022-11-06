import React from "react";
import {Link} from "react-router-dom";

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