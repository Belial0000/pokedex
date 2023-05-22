import { useState } from "react";
import { SearchForm, Cards, Modal } from "./components";
import styles from "./styles.module.scss";
import { Container } from "@mui/material";
function App() {
  return (
    <div className={styles.App}>
      <Container>
        <SearchForm />
        <Cards />
        <Modal />
      </Container>
    </div>
  );
}

export default App;
