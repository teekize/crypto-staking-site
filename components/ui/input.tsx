import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add custom properties here
  variant?: "default" | "special";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant = "default", ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border px-3 py-2 text-sm",
        variant === "special" ? "border-purple-500" : "border-input",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };