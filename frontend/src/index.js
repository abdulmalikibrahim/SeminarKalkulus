import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Rundown from './pages/Rundown';
import Certificate from './pages/Certificate';
import LinkZoom from './pages/LinkZoom';
import Audience from './pages/Audience';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
import PeraturanSeminar from './pages/PeraturanSeminar';

const root = ReactDOM.createRoot(document.getElementById('root'));
const App = () => {
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/rundown" element={<Rundown />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/linkzoom" element={<LinkZoom />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/peraturanSeminar" element={<PeraturanSeminar/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
