import React from "react";
import { Button } from "../ui/button";
import { Header } from "../ui/typography/header";
import ButtonsShowcase from "../ui/showcase/buttonsShowcase";
import FormShowcase from "../ui/showcase/formShowcase";
import InputShowcase from "../ui/showcase/inputShowcase";
import { TypographyShowcase } from "../ui/showcase/typographyShowcase";
import { useState } from "react";
import { Toaster } from "../ui/toaster";

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
