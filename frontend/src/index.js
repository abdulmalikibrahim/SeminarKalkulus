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
import '../src/assets/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const App = () => {
  return(
    <Router>
      <NavBar baseSeminar={"kalkulus"}/>
      <Routes>
        <Route path="/" 
          element={
            <Index 
              seminar={"Kalkulus"}
              title={<>Implementasi Kalkulus,<br/>Dalam kehidupan sehari-hari</>} 
              tagLine={<>Mempelajari cara kerja kalkulus dalam kehidupan sehari-hari</>}
              tanggalSeminar={"Dec, 22th 2024 | 6:30 p.m. EST"}
              imageNarsum={"images/web-hero-photo.png"}
            />
          } 
        />
        <Route path="/kalkulus" 
          element={
            <Index 
              seminar={"Kalkulus"}
              title={<>Implementasi Kalkulus,<br/>Dalam kehidupan sehari-hari</>} 
              tagLine={<>Mempelajari cara kerja kalkulus dalam kehidupan sehari-hari</>}
              tanggalSeminar={"Dec, 22th 2024 | 6:30 p.m. EST"}
              imageNarsum={"images/web-hero-photo.png"}
            />
          }
        />
        <Route path="/kalkulus/rundown" element={<Rundown />} />
        <Route path="/kalkulus/certificate" element={<Certificate seminar={"Kalkulus"} timeStart={"2024-12-22T20:00:00"}/>} />
        <Route path="/kalkulus/linkzoom" element={<LinkZoom seminar={"Kalkulus"} timeStart={"2024-12-22T18:30:00"}/>} />
        <Route path="/kalkulus/audience" element={<Audience seminar={"Kalkulus"}/>} />
        <Route path="/kalkulus/peraturanSeminar" element={<PeraturanSeminar/>} />
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
