import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import LoadingComp from './Components/LoadingComp';
import {HelmetProvider,Helmet} from 'react-helmet-async'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div className='min-h-screen'>
  {/* <StrictMode> */}
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
            <Suspense fallback={<LoadingComp/>}>
              <App />
              <Helmet>
                <meta
                  name="description"
                  content="ConceptLab is a platform for creating and sharing 3D models."
                />
                <meta property="og:title" content="ConceptLab" />
                <meta
                  property="og:description"
                  content="ConceptLab is a platform for creating and sharing 3D models."/>
                <meta property="og:type" content="website" />
                <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
                <meta property="og:url" content="https://conceptlab.live" />
                <meta property="og:image:width" content="192" />
                <meta property="og:image:height" content="192" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:alt" content="ConceptLab logo" />
                <meta name="twitter:creator" content="anomsunset" />
                <meta name="twitter:image" content="https://conceptlab.live/logo192.png" />
                <meta property="og:site_name" content="ConceptLab" />
                <title>ConceptLab</title>
              </Helmet>
            </Suspense>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  {/* </StrictMode> */}
  </div>
);

reportWebVitals();
