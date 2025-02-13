import React, { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { ButtonsShowcase } from "./components/ui/showcase/buttonsShowcase";
import { TypographyShowcase } from "./components/ui/showcase/typographyShowcase";

function App() {
  const [showButtons, setShowButtons] = useState(false);
  const [showTypography, setShowTypography] = useState(false);
  return (
    <>
      <Button onClick={() => setShowButtons(!showButtons)}>Buttons</Button>
      {showButtons && <ButtonsShowcase />}
      <Button onClick={() => setShowTypography(!showTypography)}>Typography</Button>
      {showTypography && <TypographyShowcase />}
    </>
    
  );
}

export default App;
