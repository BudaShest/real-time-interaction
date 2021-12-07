import './App.css';
import LongPulling from "./LongPulling";
import EventSource from "./EventSource";
import WebSocket from "./WebSocket";

function App() {
  return (
    <div className="App">
      {/*<EventSource/>*/}
      {/*<LongPulling/>*/}
      <WebSocket/>
    </div>
  );
}

export default App;
