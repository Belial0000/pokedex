import React, { useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";

import LinearProgress from "@mui/material/LinearProgress";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../hook";

import { fetchPokemons, selectPokemon } from "../../store/pokeSlice";
import { modalToggler } from "../../store/modalSlice";

import { colours, Color } from "./const";

import styles from "./styles.module.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Cards() {
  const dispatch = useAppDispatch();

  const modalState = useAppSelector((state) => state.modal.open);
  const pokemonState = useAppSelector((state) => state.pokemon);
  const pokemonLimit = useAppSelector((state) => state.pokemon.limit);
  const typesFilter = useAppSelector((state) => state.pokemon.typesArray);
  const clearFilterState = useAppSelector((state) => state.pokemon.clearFilter);
  const filteredPokemons = useAppSelector(
    (state) => state.pokemon.filteredPokemons
  );
  // рендер масива фильтрованных покемонов если в фильтре есть значения, если нет то дефолтный массив
  const pokemonsArray =
    typesFilter.length > 0 ? filteredPokemons : pokemonState.pokemonsArray;

  useEffect(() => {
    // повторный запрос если меняется лимит и очистка
    dispatch(fetchPokemons());
  }, [dispatch, pokemonLimit, clearFilterState]);

  return (
    <Box sx={{ flexGrow: 1, marginTop: "40px" }}>
      {/* Прелоудер */}
      {pokemonState.loading && <LinearProgress color="secondary" />}
      {/* Если нет покемонов выбранных типов  */}
      {pokemonState.filteredPokemons.length <= 0 &&
        pokemonState.typesArray.length > 0 && (
          <h2 style={{ textAlign: "center" }}>No pokemon of this type found</h2>
        )}
      <Grid
        container
        spacing={{ xs: 6, md: 8 }}
        columns={{ xs: 2, sm: 8, md: 12, lg: 24 }}
      >
        {pokemonsArray.map((pokemon, index) => (
          <Grid
            className={styles.grid}
            item
            xs={2}
            sm={4}
            md={6}
            lg={8}
            key={index}
          >
            <Item className={styles.item}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    dispatch(modalToggler(!modalState));
                    dispatch(selectPokemon(pokemon.id));
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200px"
                    image={pokemon.sprites.front_default}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {pokemon.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={styles.typesContainer}>
                  {pokemon.types.map((type, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: colours[type.type.name as keyof Color],
                        width: "50%",
                        height: "100%",
                        textTransform: "uppercase",
                        borderRadius: "5px",
                        fontWeight: "600",
                      }}
                    >
                      {type.type.name}
                    </div>
                  ))}
                </CardActions>
              </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Cards;
