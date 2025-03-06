import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-blue-700 active:bg-blue-900",
        primaryOutline:
          "bg-zinc-50 text-zinc-900 hover:bg-blue-700 active:bg-blue-900 hover:text-zinc-50",
        secondary:
          "bg-secondary text-zinc-50 hover:bg-yellow-400 active:bg-secondary",
        secondaryOutline:
          "bg-zinc-50 text-zinc-900 hover:bg-yellow-400 active:bg-secondary hover:text-zinc-50",
        success:
          "bg-green-600 text-primary-foreground hover:bg-green-500 active:bg-green-600",
        successOutline:
          "bg-zinc-50 text-zinc-900 hover:bg-green-500 active:bg-green-600 hover:text-zinc-50",
        warning:
          "bg-orange-600 text-primary-foreground hover:bg-orange-500 active:bg-orange-600",
        warningOutline:
          "bg-zinc-50 text-zinc-900 hover:bg-orange-500 active:bg-orange-600 hover:text-zinc-50",
        destructive:
          "bg-red-600 text-primary-foreground hover:bg-red-500 active:bg-red-600",
        destructiveOutline:
          "bg-zinc-50 text-zinc-900 hover:bg-red-500 active:bg-red-600 hover:text-zinc-50",
        google:
          "select-none appearance-none bg-white border border-gray-400 rounded-md box-border text-gray-800 cursor-pointer font-roboto text-sm h-10 leading-tight outline-none overflow-hidden px-3 text-center transition-shadow whitespace-nowrap w-auto min-w-min disabled:cursor-default disabled:bg-white/60 disabled:border-gray-200 disabled:opacity-38 active:bg-gray-800/12 focus:bg-gray-800/12 hover:shadow-md hover:bg-gray-800/8",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
