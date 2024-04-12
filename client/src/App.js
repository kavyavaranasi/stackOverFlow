import { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Routes from './AllRoutes';
import { fetchAllQUestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchAllQUestions())
    dispatch(fetchAllUsers())
  },[dispatch])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
