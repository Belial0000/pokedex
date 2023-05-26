import React, { useEffect } from "react";

import { Box, Button } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  filterPokemonType,
  filterPokemonName,
  clearFilter,
  changePokemonLimit,
} from "../../store/pokeSlice";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      backgroundColor: "rgba(44, 160, 235)",
      width: 250,
    },
    sx: {
      "& .MuiMenu-paper": {
        backgroundColor: "blue",
        color: "white",
      },
      "& .MuiMenuItem-root:hover": {
        backgroundColor: "rgba(206, 12, 43)",
        color: "white",
      },
      "& .Mui-selected": {
        backgroundColor: "rgb(244 0 39 / 69%) !important",
        color: "#fff900",
      },
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
function getStyles(name: string, pokemonType: string[], theme: Theme) {
  return {
    fontWeight:
      pokemonType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SearchForm() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [pokemonType, setPokemonType] = React.useState<string[]>([]);
  const filterByName = useAppSelector((state) => state.pokemon.filterByName);
  const clearFilterState = useAppSelector((state) => state.pokemon.clearFilter);

  const handleChange = (event: SelectChangeEvent<typeof pokemonType>) => {
    const {
      target: { value },
    } = event;
    dispatch(filterPokemonType(value));
    setPokemonType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    setPokemonType([]);
  }, [clearFilterState]);
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
        <div>
          <FormControl style={{ display: "flex", margin: "20px 0px" }}>
            <InputLabel style={{ color: "white" }}>Type</InputLabel>
            <Select
              color="secondary"
              multiple
              value={pokemonType}
              onChange={handleChange}
              input={<OutlinedInput label="Type" />}
              MenuProps={MenuProps}
              sx={{
                "&.MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red",
                  },
                  "&:hover fieldset": {
                    borderColor: "yellow",
                  },
                },
                ".MuiSvgIcon-root": {
                  color: "#fff",
                },
                "&:before": {
                  borderBottom: `1px solid red`,
                },
                "&:hover": {
                  ":before": {
                    borderBottom: `1px solid green`,
                  },
                },
              }}
            >
              {pokemonTypes.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, pokemonType, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ display: "flex" }}>
            <Button
              className={styles.button}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => dispatch(filterPokemonName(!filterByName))}
            >
              {filterByName ? <p>&uarr;</p> : <p> &darr;</p>} A-Z
            </Button>
            <Button
              className={styles.button}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => dispatch(clearFilter(!clearFilterState))}
            >
              <p>Clear Filter</p>
            </Button>
          </div>

          <div style={{ display: "flex" }}>
            <Button
              className={styles.button}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => dispatch(changePokemonLimit(10))}
            >
              10
            </Button>{" "}
            <Button
              className={styles.button}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => dispatch(changePokemonLimit(20))}
            >
              20
            </Button>{" "}
            <Button
              className={styles.button}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => dispatch(changePokemonLimit(30))}
            >
              30
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default SearchForm;
