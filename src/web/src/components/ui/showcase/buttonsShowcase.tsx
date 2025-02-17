import React from "react";
import { Button } from "../button";

export const ButtonsShowcase = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-8 items-center mt-10 border-2 border-zinc-900 m-auto p-6 rounded-md">
        <div className="flex flex-row gap-10 justify-center items-center">
          <Button variant="primary" size="lg" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="primary" size="md" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="primary" size="sm" className="w-fit mx-auto">
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button variant="primaryOutline" size="lg" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="primaryOutline" size="md" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="primaryOutline" size="sm" className="w-fit mx-auto">
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button variant="secondary" size="lg" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="secondary" size="md" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="secondary" size="sm" className="w-fit mx-auto">
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button
            variant="secondaryOutline"
            size="lg"
            className="w-fit mx-auto"
          >
            Continue
          </Button>
          <Button
            variant="secondaryOutline"
            size="md"
            className="w-fit mx-auto"
          >
            Continue
          </Button>
          <Button
            variant="secondaryOutline"
            size="sm"
            className="w-fit mx-auto"
          >
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button variant="success" size="lg" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="success" size="md" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="success" size="sm" className="w-fit mx-auto">
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button variant="successOutline" size="lg" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="successOutline" size="md" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="successOutline" size="sm" className="w-fit mx-auto">
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button variant="destructive" size="lg" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="destructive" size="md" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="destructive" size="sm" className="w-fit mx-auto">
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button
            variant="destructiveOutline"
            size="lg"
            className="w-fit mx-auto"
          >
            Continue
          </Button>
          <Button
            variant="destructiveOutline"
            size="md"
            className="w-fit mx-auto"
          >
            Continue
          </Button>
          <Button
            variant="destructiveOutline"
            size="sm"
            className="w-fit mx-auto"
          >
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button variant="warning" size="lg" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="warning" size="md" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="warning" size="sm" className="w-fit mx-auto">
            Continue
          </Button>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center">
          <Button variant="warningOutline" size="lg" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="warningOutline" size="md" className="w-fit mx-auto">
            Continue
          </Button>
          <Button variant="warningOutline" size="sm" className="w-fit mx-auto">
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default ButtonsShowcase;
