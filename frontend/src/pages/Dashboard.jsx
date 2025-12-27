import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      {user && (
        <div className="card">
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p>This is a protected route. Only authenticated users can see this.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

