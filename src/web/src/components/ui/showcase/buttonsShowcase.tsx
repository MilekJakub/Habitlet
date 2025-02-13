import React from "react";
import { Button } from "../button";

export const ButtonsShowcase = () => {
  return (
    <>
    <div className="flex flex-col">

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="primary" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="primary" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="primary" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="primaryOutline" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="primaryOutline" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="primaryOutline" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="secondary" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="secondary" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="secondary" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="secondaryOutline" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="secondaryOutline" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="secondaryOutline" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="success" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="success" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="success" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="successOutline" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="successOutline" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="successOutline" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="destructive" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="destructive" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="destructive" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="destructiveOutline" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="destructiveOutline" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="destructiveOutline" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="warning" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="warning" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="warning" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>

      <div className="flex grid grid-cols-3 my-4">
        <Button variant="warningOutline" size="lg" className="w-fit mx-auto">Continue</Button>
        <Button variant="warningOutline" size="md" className="w-fit mx-auto">Continue</Button>
        <Button variant="warningOutline" size="sm" className="w-fit mx-auto">Continue</Button>
      </div>
    </div>

    </>
  );
}

export default ButtonsShowcase;
