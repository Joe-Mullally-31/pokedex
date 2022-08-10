import PokemonListPage from "./components/PokemonListPage/PokemonListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PokemonDetailsPage from "./components/PokemonDetailsPage/PokemonDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/*" element={<PokemonDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
