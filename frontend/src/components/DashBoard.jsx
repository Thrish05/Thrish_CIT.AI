import SideBar from "./SideBar.jsx";
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import "./DashBoard.css";

function DashBoard() {
  return (
    <div className="app-container">
      <Header />
      <div className="layout">
        <SideBar />
        <MainContent />
      </div>
    </div>
  );
}

export default DashBoard;
