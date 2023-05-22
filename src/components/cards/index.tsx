import React from "react";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Cards() {
  return (
    <Box style={{ marginTop: "40px" }} sx={{ flexGrow: 1 }}>
      <Grid
        style={{}}
        container
        spacing={{ xs: 6, md: 8 }}
        columns={{ xs: 2, sm: 8, md: 12, lg: 24 }}
      >
        {Array.from(Array(60)).map((_, index) => (
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={2}
            sm={4}
            md={6}
            lg={8}
            key={index}
          >
            <Item style={{ height: "300px", width: "200px" }}>
              xs=2 {index}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Cards;
