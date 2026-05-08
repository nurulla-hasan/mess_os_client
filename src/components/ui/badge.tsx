import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
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
          "bg-emerald-500/15 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 backdrop-blur-sm",

        info: "bg-sky-500/15 text-sky-700 border-sky-500/20 hover:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/30 backdrop-blur-sm",

        progress:
          "bg-amber-500/15 text-amber-700 border-amber-500/20 hover:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30 backdrop-blur-sm",

        accepted:
          "bg-green-500/15 text-green-700 border-green-500/20 hover:bg-green-500/20 dark:text-green-400 dark:border-green-500/30 backdrop-blur-sm",

        active:
          "bg-emerald-500/15 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 backdrop-blur-sm",

        pending:
          "bg-orange-500/15 text-orange-700 border-orange-500/20 hover:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30 backdrop-blur-sm",

        blocked:
          "bg-rose-500/15 text-rose-700 border-rose-500/20 hover:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30 backdrop-blur-sm",

        rejected:
          "bg-red-500/15 text-red-700 border-red-500/20 hover:bg-red-500/20 dark:text-red-400 dark:border-red-500/30 backdrop-blur-sm",

        processing:
          "bg-blue-500/15 text-blue-700 border-blue-500/20 hover:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30 backdrop-blur-sm",

        completed:
          "bg-teal-500/15 text-teal-700 border-teal-500/20 hover:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/30 backdrop-blur-sm",

        manager:
          "bg-indigo-500/15 text-indigo-700 border-indigo-500/20 hover:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/30 backdrop-blur-sm",

        member:
          "bg-slate-500/15 text-slate-700 border-slate-500/20 hover:bg-slate-500/20 dark:text-slate-400 dark:border-slate-500/30 backdrop-blur-sm",

        admin:
          "bg-violet-500/15 text-violet-700 border-violet-500/20 hover:bg-violet-500/20 dark:text-violet-400 dark:border-violet-500/30 backdrop-blur-sm",
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
