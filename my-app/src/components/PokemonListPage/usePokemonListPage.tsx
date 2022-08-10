import { useState, useEffect, useMemo } from "react";

const RESULTS_PER_PAGE = 20;

export type Pokemon = {
  name: string;
  url: string;
};

const usePokemonListPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // the API does not have a search endpoint so we need to cache all of the pokemon before filtering and paginating
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0")
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results);
      });
  });

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((singlePokemon) =>
      singlePokemon.name.startsWith(search)
    );
  }, [pokemon, search]);

  const pagesCount = Math.ceil(filteredPokemon.length / RESULTS_PER_PAGE);

  const paginatedFilteredPokemon = useMemo(() => {
    const endIndex = page * RESULTS_PER_PAGE;
    const startIndex = endIndex - RESULTS_PER_PAGE;
    return filteredPokemon.slice(startIndex, endIndex);
  }, [filteredPokemon, page]);

  useEffect(() => {
    if (pagesCount !== 0 && page > pagesCount) {
      setPage(pagesCount);
    }
  }, [page, pagesCount]);

  return {
    pagesCount,
    setPage,
    paginatedFilteredPokemon,
    search,
    setSearch,
    page,
  };
};

export default usePokemonListPage;
