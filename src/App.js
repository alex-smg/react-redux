import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Lesson from './components/Lesson';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Navbar/>
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/lesson/:id" exact component={Lesson} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
