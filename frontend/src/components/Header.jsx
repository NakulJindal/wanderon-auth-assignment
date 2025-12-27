import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem' }}>MERN Auth</Link>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
          {user ? (
            <>
              <li>Welcome, {user.username}</li>
              <li><Link to="/dashboard" style={{ color: '#fff' }}>Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" style={{ color: '#fff' }}>Login</Link></li>
              <li><Link to="/register" style={{ color: '#fff' }}>Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

