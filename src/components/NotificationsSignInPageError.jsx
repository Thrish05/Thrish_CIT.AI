import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Define your theme with dark mode
const darkTheme = createTheme({
  palette: {
    mode: "dark", // This enables dark mode
  },
});

const providers = [{ id: "credentials", name: "Email and password" }];

// SignIn function to simulate login
const signIn = async (provider, formData, setIsLoggedIn, navigate) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      const email = formData?.get("email");
      const password = formData?.get("password");
      
      // Simulating successful login
      resolve({
        type: "CredentialsSignin",
        error: "Invalid credentials.", // Simulate invalid credentials for now
      });
      // Once the user is "logged in", update the state and navig ate to /dashboard
      setIsLoggedIn(true);
      navigate("/dashboard"); // Redirect to dashboard
    }, 300);
  });
  return promise;
};

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate(); // Use navigate for redirection

  return (
    <ThemeProvider theme={darkTheme}>
      <AppProvider theme={darkTheme}>
        {/* Pass signIn function with required parameters */}
        <SignInPage
          signIn={(provider, formData) =>
            signIn(provider, formData, setIsLoggedIn, navigate)
          }
          providers={providers}
        />
      </AppProvider>
    </ThemeProvider>
  );
}
