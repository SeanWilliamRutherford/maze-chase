import React from "react";
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  Link,
} from "react-router-dom";

function LogInPage() {
    return (
        <div>
            <h1>LOG IN</h1>
            <li>
                <Link to={'main'}>login</Link>
            </li>
        </div>
    )
}

export default LogInPage;