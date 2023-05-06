import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { action } from './Redux/action';
import AllRoutes from './Components/AllRoutes';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(action)
  })
  return (
    <>
      <AllRoutes/>
    </>
  );
}

export default App;
