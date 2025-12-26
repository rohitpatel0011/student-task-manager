import { FaTasks, FaCheckCircle, FaClock } from 'react-icons/fa';

const FilterBar = ({ filter, setFilter }) => {
  const filters = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: <FaTasks />,
    },
    {
      id: 'pending',
      label: 'Pending',
      icon: <FaClock />,
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: <FaCheckCircle />,
    }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        {filters.map((filterItem) => (
          <button
            key={filterItem.id}
            className={`filter-btn ${filter === filterItem.id ? 'active' : ''}`}
            onClick={() => setFilter(filterItem.id)}
          >
            <span className="filter-icon">{filterItem.icon}</span>
            <span className="filter-text">{filterItem.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;