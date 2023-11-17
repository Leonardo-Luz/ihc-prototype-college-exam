import './App.css';

import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import auth from './services/auth.service';
import { useEffect } from 'react';

function App() {
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(auth.loggedId === null && location.pathname !== '/register/user')
      navigate('/register/user')
  }, [location , navigate ])


  return (
    <div className="App">

      <Navbar/>
      <div className='nav-config' />
  
      <Outlet/>

      <Footer />
    </div>
  );
}

export default App;
