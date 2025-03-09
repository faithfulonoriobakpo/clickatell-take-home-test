import { useState } from "react";
import { useActivityContext } from "../../context/useActivityContext";
import SearchBar from "../search-bar/SearchBar";
import './ActivityList.scss';
import Pagination from "../pagination/pagination";

const ITEMS_PER_PAGE = 10;

const ActivityList = () => {
  const activities = useActivityContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredActivities = activities.filter((activity) =>
    activity.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedActivities = filteredActivities.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="activity-list">
      <div className="search-container">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <ul className="activities">
        {paginatedActivities.length > 0 ? (
          paginatedActivities.map((activity, index) => (
            <li key={index}>
              {activity.user} {activity.message} - <small>{activity.timestamp}</small>
            </li>
          ))
        ) : (
          <p>No activities found</p>
        )}
      </ul>

      {filteredActivities.length > ITEMS_PER_PAGE && (
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      )}
    </div>
  );
};

export default ActivityList;
