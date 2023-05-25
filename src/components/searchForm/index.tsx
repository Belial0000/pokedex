import React from "react";

import { Box, Button, TextField } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { filterPokemonType } from "../../store/pokeSlice";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const pokemonTypes = [
  "bug",
  "dragon",
  "electric",
  "fairy",
  "normal",
  "psychic",
  "fighting",
  "water",
  "fire",
  "flying",
  "ice",
  "rock",
  "poison",
  "ground",
  "grass",
];
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SearchForm() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    dispatch(filterPokemonType(value));
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
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
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {pokemonTypes.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}

export default SearchForm;
