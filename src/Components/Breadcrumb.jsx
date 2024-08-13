import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Breadcrumb = ({ prevPagesList, activePage }) => {
  return (
    <Box sx={{ mx: 4, my: 3 }}>
      <Breadcrumbs maxItems={3}>
        {prevPagesList.map((page) => (
          <Link to={page.link}>{page.name}</Link>
        ))}
        <Typography>{activePage}</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
