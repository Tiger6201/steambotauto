import React from 'react';
import '../App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from '../pages/home';
import Pricing from '../pages/pricing';
import About from '../pages/about';
import Panel from '../pages/panel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/login" component={Home} />
      <Route path="/panel" component={Panel} />
      <Route path="/home" component={Home} />
    </BrowserRouter>
  );
}

export default App;
