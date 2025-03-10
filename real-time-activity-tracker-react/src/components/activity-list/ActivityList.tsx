import { useState } from "react";
import { useActivityContext } from "../../context/useActivityContext";
import SearchBar from "../search-bar/SearchBar";
import './ActivityList.scss';


const ActivityList = () => {
  const activities = useActivityContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredActivities = activities.filter((activity) => {
    const searchString = activity.user + activity.message;
    return searchString.toLowerCase().includes(searchQuery.toLowerCase())
  });


  return (
    <div className="activity-list">
      <div className="search-container">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <ul className="activities">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <li key={index}>
              {activity.user} {activity.message} - <small>{activity.timestamp}</small>
            </li>
          ))
        ) : (
          <p>No activities found</p>
        )}
      </ul>
    </div>
  );
};

export default ActivityList;
