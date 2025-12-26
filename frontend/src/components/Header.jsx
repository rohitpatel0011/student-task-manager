import { SiTask } from "react-icons/si";
import { FaSignOutAlt, FaUser } from 'react-icons/fa';


const Header = ({user, handleLogout}) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">

        <h1>   <SiTask /> Student Task Manager</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="header-right">
        <div className="user-info">
          <FaUser />
          <span>{user?.email}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;