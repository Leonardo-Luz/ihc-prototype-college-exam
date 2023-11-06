import './App.css';

import { Outlet } from 'react-router-dom'

import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">

      <Navbar/>
      <div className='nav-config' />
  

      <Outlet/>

    </div>
  );
}

export default App;
