import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  useEffect(() => {
    const checkConnectivity = () => {
      if (!navigator.onLine) {
        alert("Please check your internet connection");
        // toast.error('No internet connectivity!', { position: toast.POSITION.TOP_CENTER });
      }
    };

    // Initial check
    checkConnectivity();

    // Set up event listener to check for changes in connectivity
    window.addEventListener("online", checkConnectivity);
    window.addEventListener("offline", checkConnectivity);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", checkConnectivity);
      window.removeEventListener("offline", checkConnectivity);
    };
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={() => <h1>404 Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
