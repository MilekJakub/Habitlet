import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-blue-700 active:bg-blue-900",
        primaryOutline: "bg-zinc-50 border border-zinc-900 text-zinc-900 hover:bg-blue-700 active:bg-blue-900 hover:text-zinc-50",

        secondary: "bg-secondary text-zinc-50 hover:bg-yellow-400 active:bg-secondary",
        secondaryOutline: "bg-zinc-50 border border-zinc-900 text-zinc-900 hover:bg-yellow-400 active:bg-secondary hover:text-zinc-50",

        success: "bg-green-600 text-primary-foreground hover:bg-green-500 active:bg-green-600",
        successOutline: "bg-zinc-50 border border-zinc-900 text-zinc-900 hover:bg-green-500 active:bg-green-600 hover:text-zinc-50",

        warning: "bg-orange-600 text-primary-foreground hover:bg-orange-500 active:bg-orange-600",
        warningOutline: "bg-zinc-50 border border-zinc-900 text-zinc-900 hover:bg-orange-500 active:bg-orange-600 hover:text-zinc-50",
        destructive: "bg-red-600 text-primary-foreground hover:bg-red-500 active:bg-red-600",
        destructiveOutline: "bg-zinc-50 border border-zinc-900 text-zinc-900 hover:bg-red-500 active:bg-red-600 hover:text-zinc-50",

        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
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
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
