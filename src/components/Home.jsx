import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [pharmacies, setPharmacies] = useState(null);

  useEffect(() => {
    axios.get('/api/controller/pharmacies/').then((res) => {
      setPharmacies(res.data);
      console.log(res.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div>
      <h1>Liste des pharmacies</h1>

      

      <div className="card-container">
        {pharmacies?.map((pharmacy) => (
          <div key={pharmacy.id} className="card">
            <img src={pharmacy.photos} alt={pharmacy.nom} />
            <div className="card-details">
              <h3>{pharmacy.nom}</h3>
              <p>{pharmacy.adresse}</p>
              <Link to={`/map/${pharmacy.id}`}>
              <button className="pink-button">Show Map</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
