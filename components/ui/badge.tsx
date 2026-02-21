import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Badge variants (replaces class-variance-authority)
// ---------------------------------------------------------------------------

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

const variantClasses: Record<BadgeVariant, string> = {
  // default → brand red, filled
  default:
    "border-transparent bg-[#D72828] text-white hover:bg-[#b81f1f]",
  // secondary → charcoal, filled
  secondary:
    "border-transparent bg-[#1A1A1A] text-white hover:bg-[#2e2e2e]",
  // outline → red border, transparent bg
  outline:
    "border-[#D72828] text-[#D72828] bg-transparent",
  // destructive → same red as default (kept for shadcn compatibility)
  destructive:
    "border-transparent bg-[#D72828] text-white hover:bg-[#b81f1f]",
};

// ---------------------------------------------------------------------------
// Props & component
// ---------------------------------------------------------------------------

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styles
        "inline-flex items-center rounded-full border px-2.5 py-0.5",
        "text-xs font-semibold",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-[#D72828] focus:ring-offset-2",
        // Variant styles
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
