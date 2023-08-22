import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import LoadingComp from './Components/LoadingComp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div className='min-h-screen'>
  {/* <StrictMode> */}
    <Provider store={store}>
      <BrowserRouter>
          <Suspense fallback={<LoadingComp/>}>
            <App />
          </Suspense>
      </BrowserRouter>
    </Provider>
  {/* </StrictMode> */}
  </div>
);

reportWebVitals();
