// ButtonCustom.js
import React, { forwardRef } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

/**
 * @type {import('react').ForwardRefExoticComponent<import('@mui/material').ButtonProps & React.RefAttributes<HTMLButtonElement>>}
 */
export const ButtonCustom = forwardRef(({ to, ...props }, ref) => {
  return (
    <>
      {to ? (
        <Button to={to} LinkComponent={RouterLink} ref={ref} {...props} />
      ) : (
        <Button ref={ref} {...props} />
      )}
    </>
  );
});
