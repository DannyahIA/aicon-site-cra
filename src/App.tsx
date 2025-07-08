import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AcompanhamentoOS from './AcompanhamentoOS'; 
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acompanhamento-os" element={<AcompanhamentoOS />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
