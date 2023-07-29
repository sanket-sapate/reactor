import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './Components/AllRoutes';
import { ToastContainer} from 'react-toastify';
import { Routes,Route, useLocation } from 'react-router-dom';
import { isLogin } from './Redux/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Login from './Components/Login';
import IsLogged from './Components/PrivateRoutes/IsLogged';
import Profile from './Components/Profile';
import IsNotLogged from './Components/PrivateRoutes/IsNotLogged';
import {AnimatePresence,motion} from 'framer-motion'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(isLogin())
  },[dispatch])
  const slideUp = {
		hidden: {
			top:`${window.innerHeight}px`
		},
		visible: {
			top:0,
		},
		exit: {
      top:`-100vh`
		}
	};
  const stay = {
    hidden: {
      marginTop:`${window.innerHeight}px`
    },
    visible: {
      marginTop:0
    },
    exit: {
      marginTop:0
    }
  }
  return (
    <>
      <ToastContainer/>
        <AnimatePresence initial={false}>
            <Routes location={location} key={window.location.pathname.includes('profile')}>
              <Route path='/profile' element={
                  <motion.div
                  variants={slideUp}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  transition={{ duration: .7  }}
                  className='w-full h-full absolute min-h-screen bg-white'
                  >
                    <Profile/>
                  </motion.div>
              } />
              <Route path='/profile/:section' element={<IsNotLogged to='/profile'><Profile/></IsNotLogged>} />
              <Route path='*' element={<motion.div
                  variants={stay}
                  exit='exit'
                  transition={{ duration: .7  }}
                  className='w-full h-full min-h-screen'
                  >
                    <AllRoutes/>
                  </motion.div>} />
              <Route path='/signin' element={<IsLogged to='/'><Login/></IsLogged>} />
            </Routes>
        </AnimatePresence>
    </>
  );
}

export default App;
