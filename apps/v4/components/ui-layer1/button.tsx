import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

interface UnstyledButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean
}

const UnstyledButton = React.forwardRef<HTMLButtonElement, UnstyledButtonProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        ref={ref}
        className={className}
        data-layer="1"
        data-component="button"
        {...props}
      />
    )
  }
)

UnstyledButton.displayName = "UnstyledButton"

export { UnstyledButton, type UnstyledButtonProps }