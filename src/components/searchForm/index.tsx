import React, { useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import styles from "./styles.module.scss";

function SearchForm() {
  const [text, setText] = useState("");

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
    </Box>
  );
}

export default SearchForm;
