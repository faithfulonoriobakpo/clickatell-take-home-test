import ActivityList from "./components/ActivityList";
import { ActivityProvider } from "./provider/ActivityProvider";

const App = () => {
  
  return (
    <ActivityProvider>
      <div>
        <h1>Live Activity Tracker</h1>
        <ActivityList />
      </div>
    </ActivityProvider>
  );
};

export default App;
