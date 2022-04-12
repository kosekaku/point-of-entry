import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ComponentToPrint } from './components/Certificate/main';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import POEAirport from './components/poeAirport/main';
import POELand from './components/poeLand/main';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes basename="/">
        <Route exact path="/" name="Home" element={<App />} />
        <Route
          exact
          path="/print"
          name="PrintCerti"
          element={<ComponentToPrint />}
        />
       
        <Route
          exact
          path="/airport/:passportId"
          name="Airport Entry"
          element={<POEAirport/>}
        />
        <Route
          exact
          path="/visitors/:passportId"
          name="Visitors Print Doc"
          element={<ComponentToPrint/>}
        />
         <Route
          exact
          path="/land/:passportId"
          name="Land Entry"
          element={<POELand/>}
        />       
        <Route path="*" name="Home" element={<App />} />
    
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
