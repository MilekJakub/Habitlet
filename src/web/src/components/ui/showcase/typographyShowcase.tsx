import React from "react";
import { Header } from "../typography/header";
import Subtitle from "../typography/subtitle";
import { Caption } from "../typography/caption";
import { Label } from "../typography/label";
import { Body } from "../typography/body";
import { Logo } from "../typography/logo";

export const TypographyShowcase = () => {
  return (
    <div className="flex flex-col w-full mx-auto border-2 border-zinc-900 p-6 rounded-md">
      <Header type="h1">H1. Headline</Header>
      <Header type="h2">H2. Headline</Header>
      <Header type="h3">H3. Headline</Header>
      <Header type="h4">H4. Headline</Header>
      <Header type="h5">H5. Headline</Header>
      <Subtitle type="s1">S1. Subtitle</Subtitle>
      <Subtitle type="s2">S2. Subtitle</Subtitle>
      <Caption type="c1">C1. Caption</Caption>
      <Caption type="c2">C2. Caption</Caption>
      <Label>Label</Label>
    </div>
  );
};
