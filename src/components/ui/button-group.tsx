// Thanks @fumadocs — adapted from fumadocs button-group
// https://github.com/ncdai/chanhdai.com

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
);

export function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}
