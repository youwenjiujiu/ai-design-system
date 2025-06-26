import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

const UnstyledDialog = DialogPrimitive.Root
const UnstyledDialogTrigger = DialogPrimitive.Trigger
const UnstyledDialogPortal = DialogPrimitive.Portal
const UnstyledDialogClose = DialogPrimitive.Close

const UnstyledDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={className}
    data-layer="1"
    data-component="dialog-overlay"
    {...props}
  />
))
UnstyledDialogOverlay.displayName = "UnstyledDialogOverlay"

const UnstyledDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <UnstyledDialogPortal>
    <UnstyledDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={className}
      data-layer="1"
      data-component="dialog-content"
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </UnstyledDialogPortal>
))
UnstyledDialogContent.displayName = "UnstyledDialogContent"

const UnstyledDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={className}
    data-layer="1"
    data-component="dialog-header"
    {...props}
  />
)
UnstyledDialogHeader.displayName = "UnstyledDialogHeader"

const UnstyledDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={className}
    data-layer="1"
    data-component="dialog-footer"
    {...props}
  />
)
UnstyledDialogFooter.displayName = "UnstyledDialogFooter"

const UnstyledDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={className}
    data-layer="1"
    data-component="dialog-title"
    {...props}
  />
))
UnstyledDialogTitle.displayName = "UnstyledDialogTitle"

const UnstyledDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={className}
    data-layer="1"
    data-component="dialog-description"
    {...props}
  />
))
UnstyledDialogDescription.displayName = "UnstyledDialogDescription"

export {
  UnstyledDialog,
  UnstyledDialogPortal,
  UnstyledDialogOverlay,
  UnstyledDialogTrigger,
  UnstyledDialogClose,
  UnstyledDialogContent,
  UnstyledDialogHeader,
  UnstyledDialogFooter,
  UnstyledDialogTitle,
  UnstyledDialogDescription,
}