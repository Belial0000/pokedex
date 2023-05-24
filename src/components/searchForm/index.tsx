import React from "react";

import { Box, Button, TextField } from "@mui/material";
import styles from "./styles.module.scss";

function SearchForm() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "40ch" },
        display: "flex",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <div style={{ display: "flex", margin: "20px 0px" }}>
          <TextField
            className={styles.textField}
            label="Search Pokemon"
            color="secondary"
            focused
            fullWidth
          />
          <Button
            className={styles.button}
            variant="contained"
            size="small"
            color="secondary"
          >
            search
          </Button>
        </div>

        <div>
          <Button
            className={styles.button}
            variant="contained"
            size="small"
            color="secondary"
          >
            search
          </Button>{" "}
          <Button
            className={styles.button}
            variant="contained"
            size="small"
            color="secondary"
          >
            search
          </Button>{" "}
        </div>
      </div>
    </Box>
  );
}

export default SearchForm;
