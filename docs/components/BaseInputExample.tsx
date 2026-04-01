"use client";

import React, { useState } from "react";
import { BaseInput } from "@scaffold-ui/components";

interface BaseInputExampleProps {
  initialValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

export const BaseInputExample = ({
  initialValue = "",
  placeholder,
  disabled,
  error,
}: BaseInputExampleProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <BaseInput
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
    />
  );
};
