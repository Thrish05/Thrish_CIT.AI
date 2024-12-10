import React from "react";
import "./SideBar.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Sidebar = () => {
  const semesters = [
    {
      icon: <MenuBookIcon />,
      title: "Semester 1",
    },
    {
      icon: <MenuBookIcon />,
      title: "Semester 2",
    },
    {
      icon: <MenuBookIcon />,
      title: "Semester 3",
    },
    {
      icon: <MenuBookIcon />,
      title: "Semester 4",
    },
    {
      icon: <MenuBookIcon />,
      title: "Semester 5",
    },
    {
      icon: <MenuBookIcon />,
      title: "Semester 6",
    },
    {
      icon: <MenuBookIcon />,
      title: "Semester 7",
    },
    {
      icon: <MenuBookIcon />,
      title: "Semester 8",
    },
  ];
  return (
    <div className="sidebar">
      {semesters.map((semester) => (
        <div className="semester">
          {semester.icon}
          <h3>{semester.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
