import React from 'react';
import '../App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Panel from '../pages/panel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <Route path="/" exact component={Panel} />
    </BrowserRouter>
  );
}

export default App;
