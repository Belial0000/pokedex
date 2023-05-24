import { Container } from "@mui/material";

import { SearchForm, Cards, Modal } from "./components";

import styles from "./styles.module.scss";
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
