import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-text-secondary/50 selection:bg-accent-warm/20 selection:text-text-primary border-border-tan h-10 w-full min-w-0 rounded-xl border bg-white px-4 py-2 text-base text-text-primary shadow-inner transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-accent-warm focus-visible:ring-accent-warm/30 focus-visible:ring-[3px] focus-visible:bg-bg-accent/10",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
