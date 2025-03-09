import { useState } from "react";
import { useActivityContext } from "../context/useActivityContext";
import SearchBar from "./SearchBar";

const ActivityList = () => {
  const activities = useActivityContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredActivities = activities.filter((activity) =>
    activity.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <ul>
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
