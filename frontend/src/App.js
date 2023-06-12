import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './Components/AllRoutes';
import { ToastContainer} from 'react-toastify';
import { Routes,Route } from 'react-router-dom';
import { isLogin } from './Redux/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(isLogin())
  },[])
  return (
    <>
      <Routes>
        <Route path='/1' element={<>1</>} />
        <Route path='*' element={<AllRoutes/>} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
