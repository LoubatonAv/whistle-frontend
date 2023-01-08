import { Home } from './pages/Home.jsx';
import { BrowserRouter as Router, Routes, Switch, Route, useLocation } from 'react-router-dom';
import { routes } from './routes.js';

import './App.css';

export function RootCmp() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} exact element={<route.component />} path={route.path} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}
