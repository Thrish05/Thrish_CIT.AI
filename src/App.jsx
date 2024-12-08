import DashBoard from "./components/DashBoard.jsx";
import NotificationsSignInPageError from "./components/NotificationsSignInPageError.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import MediaCard from "./components/DepartmentSelect.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // return <MediaCard />;
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/"
          element={
            <NotificationsSignInPageError setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* Dashboard route */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashBoard /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
