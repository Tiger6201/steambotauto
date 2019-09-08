import React from 'react';
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark">
            <h1 className="my-0 mr-md-auto font-weight-normal">SteamIdle</h1>
            <nav className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-light" to="/home">Home</Link>
                <Link className="p-2 text-light" to="/about">About</Link>
                <Link className="p-2 text-light" to="/pricing">Pricing</Link>
                <Link className="p-2 text-light" to="/Panel">Panel</Link>
            </nav>

            <Link to="/login"><img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" width="180" height="35" border="0" alt="">
            </img></Link>
            
        </div>
    )
}

export default Header;