"use client"

import * as React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={`text-sm font-medium leading-none ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label } 