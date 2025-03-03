import React from "react"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router"

export const AppTopbar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 w-full", className)}
      {...props}
    >
      <NavLink
        to="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </NavLink>
      <NavLink
        to="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </NavLink>
      <NavLink
        to="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </NavLink>
      <NavLink
        to="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </NavLink>
    </nav>
  )
}
