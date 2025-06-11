import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Neurotechnology@Berkeley</Link>
            <ul>
                <li><Link to="/operations">Operations</Link></li>
                <li><Link to="/education">Education</Link></li>
                <li><Link to="/publications">Publications</Link></li>
                <li><Link to="/devices">Devices</Link></li>
                <li><Link to="/software">Software</Link></li>
                <li><Link to="/wetware">Wetware</Link></li>
            </ul>
        </nav>
    )
}