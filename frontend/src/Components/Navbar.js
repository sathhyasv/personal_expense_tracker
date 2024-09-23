import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase Auth

function Navbar() {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      localStorage.removeItem('user'); // Clear any other user data if necessary
      // Optionally, redirect to login page
      window.location.href = '/login'; // Or use navigate('/login') if using useNavigate
    } catch (error) {
      console.error('Error during logout:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {/* Other Links */}
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt style={{ fontSize: '24px' }} /> Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FaSignOutAlt style={{ fontSize: '24px', marginRight: '5px' }} />
            Logout
          </button>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
