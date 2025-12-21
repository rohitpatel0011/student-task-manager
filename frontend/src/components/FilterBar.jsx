import { FaFilter, FaTasks, FaCheckCircle, FaClock } from 'react-icons/fa';

const FilterBar = ({ filter, setFilter }) => {
  const filters = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: <FaTasks />,
      count: null
    },
    {
      id: 'pending',
      label: 'Pending',
      icon: <FaClock />,
      count: null
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: <FaCheckCircle />,
      count: null
    }
  ];

  return (
    <div className="filter-section">
    

      <div className="filter-buttons-container">
        {filters.map((filterItem) => (
          <button
            key={filterItem.id}
            className={`filter-button ${filter === filterItem.id ? 'active' : ''}`}
            onClick={() => setFilter(filterItem.id)}
            title={`Show ${filterItem.label}`}
          >
            <span className="filter-icon-wrapper">
              {filterItem.icon}
            </span>
            <span className="filter-label">
              {filterItem.label}
            </span>
            {filterItem.count !== null && (
              <span className="filter-count">
                {filterItem.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;