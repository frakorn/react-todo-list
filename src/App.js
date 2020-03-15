import React from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar';
import TodoList from './components/todo-list/todo-list';
import EditList from './components/edit-list/edit-list';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
      <Switch>
            <Route exact path='/' component={TodoList} />
            <Route exact path='/todo-list' component={TodoList} />
            <Route exact path='/edit-list' component={EditList} />
      </Switch>


      </header>
    </div>
  );
}

export default App;
