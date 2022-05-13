import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

import './App.scss';

const Wizard = lazy(() => import(/* webpackChunkName: "Wizard" */ './containers/Wizard/Wizard'));

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="*"
            element={
              <Suspense fallback>
                <Wizard />
              </Suspense>
            }
          >
            {/* <Route path="/" element={<Navigate replace to="/password-manager-info" />} />
            <Route path="*" element={<span>NO MATCH</span>} /> */}
          </Route>
          {/* <Route path="*" element={<span>NO MATCH</span>} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
