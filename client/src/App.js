import { Fragment, React } from 'react';
import { Route } from "react-router-dom";
import './App.css';

//components
import Login from './components/login/Login'
import Home from './components/Home/Home'
import Crud from './components/CRUD users/indexUsers'

//rutas login home users stats

function App() {
  return (
    <Fragment>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/crud" component={Crud} />
    </Fragment>
    
  );
}

export default App;
