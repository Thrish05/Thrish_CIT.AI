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

        <Route
          path="/select-department"
          element={isLoggedIn ? <MediaCard /> : <Navigate to="/" replace />}
        />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
