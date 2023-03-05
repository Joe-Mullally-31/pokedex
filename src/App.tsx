import PokemonListPage from "./components/PokemonListPage/PokemonListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetailsPage from "./components/PokemonDetailsPage/PokemonDetailsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/pokemon/*" element={<PokemonDetailsPage />} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
