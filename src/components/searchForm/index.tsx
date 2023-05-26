import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppDispatch, useAppSelector } from "../../hook";
import {
  filterPokemonType,
  filterPokemonName,
  clearFilter,
  changePokemonLimit,
} from "../../store/pokeSlice";

import { MenuProps, pokemonTypes } from "./const";

import styles from "./styles.module.scss";

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

  const filterByName = useAppSelector((state) => state.pokemon.filterByName);
  const clearFilterState = useAppSelector((state) => state.pokemon.clearFilter);

  const [pokemonType, setPokemonType] = React.useState<string[]>([]);

  // функция изменения типов

  const handleChange = (event: SelectChangeEvent<typeof pokemonType>) => {
    const {
      target: { value },
    } = event;
    dispatch(filterPokemonType(value));
    setPokemonType(typeof value === "string" ? value.split(",") : value);
  };

  // чистим стейт типов при тригире отчистки
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
        <FormControl className={styles.formControl}>
          <InputLabel className={styles.inputLabel}>Type</InputLabel>
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
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => dispatch(filterPokemonName(!filterByName))}
          >
            {filterByName ? <p>&uarr;</p> : <p>&darr;</p>} A-Z
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

        <div className={styles.buttonContainer}>
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
    </Box>
  );
}

export default SearchForm;
