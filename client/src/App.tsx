import { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";

// import LoginPage from "./pages/Login";
// import RegisterPage from "./pages/Register";
// import TeamPage from "./pages/Team";

function App() {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const source = new EventSource("http://localhost:8080/api/stream");

    source.onopen = () => {
      console.log("connection to stream has been opened");
    };

    source.onerror = (error) => {
      console.log("An error has occurred while receiving stream", error);
    };

    source.onmessage = (stream) => {
      console.log("received stream", stream);

      setNotification(stream.data);
    };

    // Clean up event listeners on component unmount
    return () => {
      source.close();
    };
  });

  return <div className="App">{notification}</div>;
}

export default App;
