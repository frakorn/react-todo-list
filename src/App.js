import React from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar';
import TodoList from './components/todo-list/todo-list';
import EditList from './components/edit-list/edit-list';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Switch>
          <Route exact path='/todo-list' component={TodoList} />
          <Route exact path='/edit-list' component={EditList} />
          <Route path='/' component={TodoList} />
        </Switch>
      </header>
      <ToastContainer autoClose={2500}  />
    </div>
  );
}

export default App;
