import React, { useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hook";
import { modalToggler } from "../../store/modalSlice";

import { Button } from "@mui/material";
import {
  fetchPokemons,
  selectPokemon,
  changePokemonLimit,
  filterPokemonType,
} from "../../store/pokeSlice";
import styles from "./styles.module.scss";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
interface Color {
  normal: string;
  fire: string;
  water: string;
  electric: string;
  grass: string;
  ice: string;
  fighting: string;
  poison: string;
  ground: string;
  flying: string;
  psychic: string;
  bug: string;
  rock: string;
  ghost: string;
  dragon: string;
  dark: string;
  steel: string;
  fairy: string;
}
const colours: Color = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
function Cards() {
  const modalState = useAppSelector((state) => state.modal.open);
  const pokemonState = useAppSelector((state) => state.pokemon);
  const pokemonLimit = useAppSelector((state) => state.pokemon.limit);
  const typesFilter = useAppSelector((state) => state.pokemon.typesArray);
  console.log(useAppSelector((state) => state));
  console.log(pokemonState);
  console.log(pokemonState?.pokemonsArray[1]?.abilities);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch, pokemonLimit, typesFilter]);

  return (
    <Box style={{ marginTop: "40px" }} sx={{ flexGrow: 1 }}>
      <Grid
        style={{}}
        container
        spacing={{ xs: 6, md: 8 }}
        columns={{ xs: 2, sm: 8, md: 12, lg: 24 }}
      >
        {pokemonState.pokemonsArray.map((pokemon, index) => (
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={2}
            sm={4}
            md={6}
            lg={8}
            key={index}
          >
            <Item className={styles.item} style={{ width: "200px" }}>
              <Card sx={{ maxWidth: 345 }}>
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
                <CardActions
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
                <Button
                  onClick={() => {
                    dispatch(changePokemonLimit(10));
                  }}
                >
                  10
                </Button>{" "}
                <Button
                  onClick={() => {
                    dispatch(changePokemonLimit(20));
                  }}
                >
                  20
                </Button>{" "}
                <Button
                  onClick={() => {
                    dispatch(changePokemonLimit(30));
                  }}
                >
                  30
                </Button>
              </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Cards;
