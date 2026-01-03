import { FaPlus } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { FaChartBar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const BottomNav = ({ activeView, setActiveView }) => {
  const navItems = [
    {
      id: 'home',
      icon: <FaHome size={22} />,
      label: 'Home'
    },
    {
      id: 'add',
      icon: <FaPlus size={22} />,
      label: 'Add'
    },
    {
      id: 'tasks',
      icon: <SiGoogletasks size={22} />,
      label: 'Tasks'
    },
    {
      id: 'stats',
      icon: <FaChartBar size={22} />,
      label: 'Stats'
    },
    {
      id: 'profile',
      icon: <FaUserCircle size={22} />,
      label: 'Profile'
    }
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <div className="nav-icon-wrapper">
              {item.icon}
            </div>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;