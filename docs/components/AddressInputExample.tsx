"use client";

import React, { useState } from "react";
import { AddressInput } from "@scaffold-ui/components";

interface AddressInputExampleProps {
  initialValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const AddressInputExample = ({ initialValue = "", placeholder, disabled }: AddressInputExampleProps) => {
  const [address, setAddress] = useState(initialValue);

  return (
    <AddressInput
      value={address}
      onChange={setAddress}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
