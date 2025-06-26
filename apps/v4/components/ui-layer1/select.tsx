import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"

const UnstyledSelect = SelectPrimitive.Root
const UnstyledSelectGroup = SelectPrimitive.Group
const UnstyledSelectValue = SelectPrimitive.Value

const UnstyledSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={className}
    data-layer="1"
    data-component="select-trigger"
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
))
UnstyledSelectTrigger.displayName = "UnstyledSelectTrigger"

const UnstyledSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={className}
    data-layer="1"
    data-component="select-scroll-up"
    {...props}
  />
))
UnstyledSelectScrollUpButton.displayName = "UnstyledSelectScrollUpButton"

const UnstyledSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={className}
    data-layer="1"
    data-component="select-scroll-down"
    {...props}
  />
))
UnstyledSelectScrollDownButton.displayName = "UnstyledSelectScrollDownButton"

const UnstyledSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={className}
      position={position}
      data-layer="1"
      data-component="select-content"
      {...props}
    >
      <UnstyledSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={className}
        data-layer="1"
        data-component="select-viewport"
      >
        {children}
      </SelectPrimitive.Viewport>
      <UnstyledSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
UnstyledSelectContent.displayName = "UnstyledSelectContent"

const UnstyledSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={className}
    data-layer="1"
    data-component="select-label"
    {...props}
  />
))
UnstyledSelectLabel.displayName = "UnstyledSelectLabel"

const UnstyledSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={className}
    data-layer="1"
    data-component="select-item"
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
UnstyledSelectItem.displayName = "UnstyledSelectItem"

const UnstyledSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={className}
    data-layer="1"
    data-component="select-separator"
    {...props}
  />
))
UnstyledSelectSeparator.displayName = "UnstyledSelectSeparator"

export {
  UnstyledSelect,
  UnstyledSelectGroup,
  UnstyledSelectValue,
  UnstyledSelectTrigger,
  UnstyledSelectContent,
  UnstyledSelectLabel,
  UnstyledSelectItem,
  UnstyledSelectSeparator,
  UnstyledSelectScrollUpButton,
  UnstyledSelectScrollDownButton,
}