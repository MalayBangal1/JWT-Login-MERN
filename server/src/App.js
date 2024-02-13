import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Error from './components/Error';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Header/>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dash' element={<Dashboard/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
    </React.Fragment>
    
  )
}

export default App;
