import * as React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./DepartmentSelect.css";

// Create a theme for Dark Mode
const theme = createTheme({
  palette: {
    mode: "dark", // Set the mode to dark
    primary: {
      main: "#1976d2", // Set your primary color here (can be adjusted)
    },
    secondary: {
      main: "#f50057", // Set your secondary color here (can be adjusted)
    },
  },
});

function RadioButtonsGroup({ department, selectedRadio, handleRadioChange }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Choose One</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={selectedRadio} // Controlled value
        onChange={(e) => handleRadioChange(department, e.target.value)} // Update radio button selection
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="Regulation 21"
          control={<Radio />}
          label="Regulation 21"
        />
        <FormControlLabel
          value="Regulation 22"
          control={<Radio />}
          label="Regulation 22"
        />
        <FormControlLabel
          value="Regulation 22R"
          control={<Radio />}
          label="Regulation 22R"
        />
        <FormControlLabel
          value="Regulation 24"
          control={<Radio />}
          label="Regulation 24"
        />
      </RadioGroup>
    </FormControl>
  );
}

function MediaCard() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [selectedDepartment, setSelectedDepartment] = React.useState(null); // Track selected department
  const [radioSelection, setRadioSelection] = React.useState({}); // Track radio selection per department

  const departments = [
    { name: "IT", title: "IT department" },
    { name: "CSE", title: "CSE department" },
    { name: "AIDS", title: "AIDS department" },
    { name: "AIML", title: "AIML department" },
    { name: "CyberSecurity", title: "CyberSecurity department" },
    { name: "MECH", title: "MECH department" },
    { name: "MCT", title: "MCT department" },
    { name: "ECE", title: "ECE department" },
    { name: "EEE", title: "EEE department" },
    { name: "BME", title: "BME department" },
  ];

  // Handle department click to toggle radio button visibility
  const handleDepartmentClick = (department, event) => {
    if (event.target.closest("label")) {
      return; // Prevent toggling when clicking on the radio button
    }
    if (selectedDepartment === department.name) {
      setSelectedDepartment(null); // Deselect if the same department is clicked again
    } else {
      setSelectedDepartment(department.name); // Set the selected department
    }
  };

  // Handle radio button selection change
  const handleRadioChange = (department, value) => {
    setRadioSelection({
      ...radioSelection,
      [department.name]: value, // Store the selected radio value for the department
    });
  };

  // Check if the Continue button should be displayed
  const isContinueVisible = Object.values(radioSelection).some(
    (value) => value
  );

  // Handle Continue button click
  const handleContinueClick = () => {
    navigate("/dashboard"); // Navigate to /dashboard when Continue is clicked
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="card-family">
        {departments.map((department) => (
          <Card
            key={department.name}
            className="card-item"
            sx={{
              maxWidth: 345,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
              },
              position: "relative", // Ensure card's internal elements don't overflow
              overflow: "hidden", // Prevent content from spilling out of the card
              marginBottom: "20px", // Space between cards
            }}
            onClick={(event) => handleDepartmentClick(department, event)} // Handle click on department card
          >
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title={department.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {department.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Click here to know about the regulations Of {department.title}
              </Typography>
              <br />

              {/* Show radio buttons only if the current department is selected */}
              {selectedDepartment === department.name && (
                <RadioButtonsGroup
                  department={department}
                  selectedRadio={radioSelection[department.name] || ""}
                  handleRadioChange={handleRadioChange}
                />
              )}
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
        {/* Show the Continue button at the bottom if any radio button is selected */}
        {isContinueVisible && (
          <div className="continue-button-container">
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "100%",
                marginTop: "20px", // Ensure it appears below the last card
                padding: "10px",
              }}
              onClick={handleContinueClick} // Navigate to /dashboard on click
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default MediaCard;
