const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
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

export const pokemonTypes = [
  "bug",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ground",
  "grass",
  "ice",
  "normal",
  "psychic",
  "poison",
  "rock",
  "water",
];
