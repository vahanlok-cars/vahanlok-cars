import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Variant & size maps  (replaces class-variance-authority)
// ---------------------------------------------------------------------------

type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[#D72828] text-white shadow hover:bg-[#b81f1f] active:bg-[#9a1a1a] focus-visible:ring-[#D72828]",
  outline:
    "border border-[#D72828] bg-transparent text-[#D72828] shadow-sm hover:bg-[#D72828] hover:text-white active:bg-[#b81f1f]",
  secondary:
    "bg-[#1A1A1A] text-white shadow-sm hover:bg-[#2e2e2e] active:bg-[#111111]",
  ghost:
    "bg-transparent text-[#1A1A1A] hover:bg-gray-100 active:bg-gray-200",
  link: "bg-transparent text-[#D72828] underline-offset-4 hover:underline h-auto px-0 py-0 shadow-none",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-12 rounded-md px-8 text-base",
  icon: "h-10 w-10",
};

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
  "transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(BASE, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
