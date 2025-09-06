import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium font-roboto ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-md-primary text-white hover:bg-md-primary-variant md-elevation-1 hover:md-elevation-2 rounded-md",
        destructive: "bg-md-error text-white hover:bg-md-error/90 md-elevation-1 hover:md-elevation-2 rounded-md",
        "destructive-outline": "border-2 border-md-error text-md-error hover:bg-md-error hover:text-white rounded-md transition-all duration-200",
        outline: "border border-md-border bg-transparent text-md-text-primary hover:bg-md-border/50 rounded-md",
        secondary: "bg-md-border text-md-text-primary hover:bg-md-border/80 rounded-md",
        ghost: "text-md-text-primary hover:bg-md-border/30 rounded-md",
        link: "text-md-primary underline-offset-4 hover:underline font-medium",
        "link-destructive": "text-md-error underline-offset-4 hover:underline font-medium",
        fab: "bg-md-primary text-white hover:bg-md-primary-variant md-elevation-3 hover:md-elevation-4 rounded-full shadow-lg",
        success: "bg-md-success text-white hover:bg-md-success/90 md-elevation-1 hover:md-elevation-2 rounded-md",
        warning: "bg-md-warning text-white hover:bg-md-warning/90 md-elevation-1 hover:md-elevation-2 rounded-md",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
        fab: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
