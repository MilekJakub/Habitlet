import React from "react";
import { Input } from "../input";
import { Label } from "../typography/label";

export const InputShowcase = () => {
  return (
    <div className="flex flex-col w-1/2 gap-4 items-center mt-10 border-2 border-zinc-900 m-auto p-6 rounded-md">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label className="text-zinc-400" htmlFor="password">
          Password
        </Label>
        <Input disabled type="password" id="password" placeholder="Password" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
    </div>
  );
};

export default InputShowcase;
