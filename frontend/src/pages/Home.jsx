import React from "react";
import {Link} from "react-router-dom";
import styles from "../stylesheets/Home.module.css";

function Home() {
    return (
        <div className={styles.page}>
            <h1>Maze Chase</h1>
            <div className={styles.options}>
                <li className={styles.list}>
                    <Link to={'/play'}>
                        <button className={styles.button}>Single Player</button>
                    </Link>
                                         
                        <button className={styles.button}>Multiplayer - coming soon</button>
                    

                </li>
            </div>
        </div>
    )
}

export default Home;