import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary/5 text-primary border-primary/10 hover:bg-primary/10 dark:bg-primary/10 dark:text-primary-400 dark:border-primary/20 backdrop-blur-sm",

        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",

        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

        warning:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-400 backdrop-blur-sm",

        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

        ghost:
          "border-transparent bg-transparent hover:bg-muted text-foreground",

        muted:
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",


        success:
          "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-50 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800 backdrop-blur-sm",

        info: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 backdrop-blur-sm",

        progress:
          "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 backdrop-blur-sm",

        accepted:
          "bg-green-50 text-green-600 border-green-100 hover:bg-green-50 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 backdrop-blur-sm",

        rejected: "bg-red-50 text-red-600 border-red-100 hover:bg-red-50 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
