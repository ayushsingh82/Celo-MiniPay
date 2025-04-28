"use client"

import * as React from "react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, onValueChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    return (
      <select
        className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${className || ""}`}
        ref={ref}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <option
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
SelectItem.displayName = "SelectItem"

// Create simplified versions of the other components
const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectValue = ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>;
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} 