import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import LoadingComp from './Components/LoadingComp';
import {HelmetProvider} from 'react-helmet-async'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div className='min-h-screen'>
  {/* <StrictMode> */}
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
            <Suspense fallback={<LoadingComp/>}>
              <App />
            </Suspense>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  {/* </StrictMode> */}
  </div>
);

reportWebVitals();
