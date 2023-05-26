import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { useAppSelector, useAppDispatch } from "../../hook";
import { modalToggler } from "../../store/modalSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function Modal() {
  const modalState = useAppSelector((state) => state.modal.open);
  const pokemon = useAppSelector((state) => state.pokemon.selectedPokemon);

  const dispatch = useAppDispatch();

  return (
    <div>
      <Dialog
        open={modalState}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => dispatch(modalToggler(!modalState))}
      >
        <DialogTitle> {pokemon?.name.toUpperCase()}</DialogTitle>
        <DialogTitle>Stats</DialogTitle>
        <DialogContent>
          {pokemon?.stats.map((stats, index) => (
            <DialogContentText key={index}>
              {stats.stat.name.toUpperCase()} : {stats.base_stat}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogTitle>Abilities</DialogTitle>
        <DialogContent>
          {pokemon?.abilities.map((ability, index) => (
            <DialogContentText key={index}>
              {ability.ability.name}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(modalToggler(!modalState))}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
