import React from 'react';
import { Link } from "react-router-dom";

function PanelHeader() {
    return (

<nav className="navbar navbar-expand navbar-dark bg-dark">
  <h1 className="" href="#">SteamIdle</h1>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarCollapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <button className="nav-link" style={{display:"contents"}}><Link className="p-2 text-light" to="/home">Home</Link><span className="sr-only">(current)</span></button>
      </li>
    </ul>
  </div>
</nav>

    )
}

export default PanelHeader;