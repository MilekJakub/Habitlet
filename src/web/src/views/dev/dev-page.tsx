import React from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/typography/header";
import { ButtonsShowcase } from "@/components/dev/showcase/buttons-showcase";
import { FormShowcase } from "@/components/dev/showcase/form-showcase";
import { InputShowcase } from "@/components/dev/showcase/input-showcase";
import { TypographyShowcase } from "@/components/dev/showcase/typography-showcase";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

import "./dev-page.style.css";

export const DevPage = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showTypography, setShowTypography] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Header type="h1">Dev Page</Header>

      <div className="flex gap-4 justify-center">
        <Button
          variant={showButtons ? "primary" : "primaryOutline"}
          onClick={() => setShowButtons(!showButtons)}
        >
          Buttons
        </Button>
        <Button
          variant={showTypography ? "primary" : "primaryOutline"}
          onClick={() => setShowTypography(!showTypography)}
        >
          Typography
        </Button>
        <Button
          variant={showInput ? "primary" : "primaryOutline"}
          onClick={() => setShowInput(!showInput)}
        >
          Input
        </Button>
        <Button
          variant={showForm ? "primary" : "primaryOutline"}
          onClick={() => setShowForm(!showForm)}
        >
          Form
        </Button>
      </div>

      {showButtons && <ButtonsShowcase />}
      {showTypography && <TypographyShowcase />}
      {showInput && <InputShowcase />}
      {showForm && <FormShowcase />}
      <Toaster />
    </div>
  );
};

export default DevPage;
