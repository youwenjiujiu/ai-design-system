import * as React from "react"

interface UnstyledInputProps extends React.ComponentProps<"input"> {}

const UnstyledInput = React.forwardRef<HTMLInputElement, UnstyledInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={className}
        data-layer="1"
        data-component="input"
        {...props}
      />
    )
  }
)

UnstyledInput.displayName = "UnstyledInput"

export { UnstyledInput, type UnstyledInputProps }