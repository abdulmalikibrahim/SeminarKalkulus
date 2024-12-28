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
import LinkGroupWA from './component/LinkGroupWA';

const root = ReactDOM.createRoot(document.getElementById('root'));
const App = () => {
  return(
    <Router>
      <div style={{position:"fixed", bottom:"10px", right:"10px", zIndex:"2000"}}>
        <LinkGroupWA />
      </div>
      <NavBar baseSeminar={"pemrograman"}/>
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
              imageNarsum2={"images/speaker-may.png"}
              imageMC={"images/speaker-xeng.png"}
              imageModerator={"images/speaker-white.png"}
              nameNarsum = {"Mohamad Irlin Sunggawa, S.Pd., M. Si."}
              nameModerator = {"MAWADAH"}
              nameMC = {"FETI FAJRIYANTI"}
            />
          }
        />
        <Route path="/pemrograman" 
          element={
            <Index 
              seminar={"B. Pemrograman"}
              title={<>Fondasi Dasar Menjadi IT<br/>Berkualitas di Dunia Industri</>} 
              tagLine={<>Belajar mengenai fondasi dasar agar menjadi IT yang berkualitas</>}
              tanggalSeminar={"Dec, 28th 2024 | 20:00 p.m. EST"}
              imageNarsum={"images/web-hero-photo-pemrogaram.png"}
              imageNarsum2={"images/speaker-may-pemrogaram.png"}
              imageMC={"images/speaker-xeng-pemrograman.png"}
              imageModerator={"images/speaker-white.png"}
              nameNarsum = {"Deddy Maryanto S.Kom"}
              nameModerator = {"MAWADAH"}
              nameMC = {"ZAHRA TAZKIA"}
            />
          }
        />
        <Route path="/peraturanSeminar" element={<PeraturanSeminar/>} />
        <Route path="/kalkulus/rundown" element={<Rundown />} />
        <Route path="/kalkulus/certificate" element={<Certificate seminar={"Kalkulus"} timeStart={"2024-12-22T20:00:00"}/>} />
        <Route path="/kalkulus/linkzoom" element={<LinkZoom seminar={"Kalkulus"} timeStart={"2024-12-22T18:30:00"}/>} />
        <Route path="/kalkulus/audience" element={<Audience seminar={"Kalkulus"}/>} />
        <Route path="/kalkulus/peraturanSeminar" element={<PeraturanSeminar/>} />
        
        <Route path="/pemrograman/rundown" element={<Rundown />} />
        <Route path="/pemrograman/certificate" element={<Certificate seminar={"B. Pemrograman"} timeStart={"2024-12-29T12:00:00"}/>} />
        <Route path="/pemrograman/linkzoom" element={<LinkZoom seminar={"B. Pemrograman"} timeStart={"2024-12-28T19:50:00"}/>} />
        <Route path="/pemrograman/audience" element={<Audience seminar={"B. Pemrograman"}/>} />
        <Route path="/pemrograman/peraturanSeminar" element={<PeraturanSeminar/>} />
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
