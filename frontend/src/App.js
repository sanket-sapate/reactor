import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './Components/AllRoutes';
import { ToastContainer} from 'react-toastify';
import { Routes,Route } from 'react-router-dom';
import { isLogin } from './Redux/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Login from './Components/Login';
import IsLogged from './Components/PrivateRoutes/IsLogged';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(isLogin())
  },[dispatch])
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/signin' element={<IsLogged to='/'><Login/></IsLogged>} />
        <Route path='*' element={<AllRoutes/>} />
      </Routes>
    </>
  );
}

export default App;
