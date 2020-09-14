import React from 'react';
import './App.scss';
import NavigationHeader from "./components/navigation-header/navigation-header";
import Dashboard from "./components/dashboard/dashboard";

function App() {
    return (
        <div className="App">
            <NavigationHeader/>
            <Dashboard/>
        </div>
    );
}

export default App;
