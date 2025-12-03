import { Card } from "@mui/material";
import React, { forwardRef } from "react";

export const FormWrapper = forwardRef((props, ref) => {
  const { children, className = "", ...rest } = props;

  return (
    <Card
      elevation={0}
      ref={ref}
      className={`border border-[var(--color-border)] rounded p-4 ${className}`}
      {...rest}
    >
      {children}
    </Card>
  );
});
