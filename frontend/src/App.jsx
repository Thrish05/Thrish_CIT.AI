// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SemesterDetails from "./components/SemesterDetails.jsx"; // Your form component

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route for SemesterDetails */}
//         <Route path="/" element={<SemesterDetails />} />
//         {/* You can keep the '/semester-details' route as well
//         <Route path="/semester-details" element={<SemesterDetails />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import DashBoard from "./components/DashBoard.jsx";
import NotificationsSignInPageError from "./components/NotificationsSignInPageError.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import DepartmentSelect from "./components/DepartmentSelect.jsx";

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
          element={
            isLoggedIn ? <DepartmentSelect /> : <Navigate to="/" replace />
          }
        />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
