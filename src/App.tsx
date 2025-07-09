import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AcompanhamentoOS from './components/AcompanhamentoOS';
import CompreComAGente from './components/CompreConosco';
import Footer from './components/Footer';


const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acompanhar-os" element={<AcompanhamentoOS />} />
        <Route path="/compre" element={<CompreComAGente />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
