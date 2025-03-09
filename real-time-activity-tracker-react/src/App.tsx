import ActivityList from "./components/activity-list/ActivityList";
import { ActivityProvider } from "./provider/ActivityProvider";
import "./App.scss";

const App = () => {
  
  return (
    <ActivityProvider>
      <div>
        <h1 className="header">Live Activity Tracker</h1>
        <ActivityList />
      </div>
    </ActivityProvider>
  );
};

export default App;
