import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/pharmacie">Pharmacie</Link>
        </li>
        <li>
          <Link to="/ville">Ville</Link>
        </li>
        <li>
          <Link to="/garde">Garde</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
      </ul>
    </div>
  );
}
