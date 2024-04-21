import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "./counter/Counter";
import Chatbot from "./components/Chatbot";
import { Button } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface AppProps {
  toggleTheme: ToggleTheme;
}

const App = ({ toggleTheme }: AppProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle theme
  const handleToggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
    toggleTheme(); // Call the toggleTheme function passed from the parent component
  };

  // Determine background color based on the current theme
  const backgroundColor = isDarkTheme ? "#333" : "#fff";

  // Determine icon based on the current theme
  const IconComponent = isDarkTheme ? Brightness7Icon : Brightness4Icon;

  return (
    <div style={{ backgroundColor, minHeight: "100vh", position: "relative" }}>
      <BrowserRouter>
        <Button
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "auto",
            height: "auto",
            borderRadius: "50%",
          }}
          variant="outlined"
          onClick={handleToggleTheme}
        >
          <IconComponent />
        </Button>
        <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/s" element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
