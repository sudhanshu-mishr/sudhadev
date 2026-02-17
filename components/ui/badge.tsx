import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils.ts"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 italic",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]",
        secondary:
          "border-transparent bg-slate-800 text-slate-100",
        destructive:
          "border-transparent bg-red-600 text-white",
        outline: "text-white border-white/20 backdrop-blur-md bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Use type intersection with ComponentPropsWithoutRef to ensure className and variant are correctly handled by the compiler
export type BadgeProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof badgeVariants>

// Ensure the component correctly uses the BadgeProps type for destructuring
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
