import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const BreadCrumbCustom = ({ links = [], pageTitle }) => {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map(({ label, to }, index) => (
          <Link
            key={index}
            to={to}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {label}
          </Link>
        ))}
        <Typography sx={{ color: "text.primary" }}>{pageTitle}</Typography>
      </Breadcrumbs>
      <Typography fontSize={24} sx={{ color: "text.primary" }}>
        {pageTitle}
      </Typography>
    </Box>
  );
};
