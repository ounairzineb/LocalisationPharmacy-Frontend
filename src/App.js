




import logo from './logo.svg';
import './App.css';
import Ville from './components/Ville';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Zone from './components/Zone';
import Garde from './components/Garde';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Map from './components/Map';
import Pharmacie from './components/Pharmacie';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/pharmacie" element={<Pharmacie />} />
        <Route path="/ville" element={<Ville />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/garde" element={<Garde />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map/:id" element={<Map />} />
        <Route exact path="/" component={Home} />
         
       
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add this route */}
      </Routes>
    </div>
  );
}

export default App;
