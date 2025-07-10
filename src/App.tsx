import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BuyWithUs from './components/BuyWithUs';
import TrackOS from './components/TrackOS';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/acompanhar-os" element={<TrackOS />} />
        <Route path="/compre" element={<BuyWithUs />} />
      </Routes>
    </Router>
  );
};

export default App;
