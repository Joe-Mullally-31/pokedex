import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";

const RESULTS_PER_PAGE = 20;

export type Pokemon = {
  name: string;
  url: string;
};

const usePokemonListPage = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // the API does not have a search endpoint so we need to cache all of the pokemon before filtering and paginating
  const getAllPokemonQuery = useQuery<Pokemon[]>(["getAllPokemon"], () =>
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0")
      .then((response) => response.json())
      .then((data) => data.results)
  );

  const filteredPokemon = useMemo(() => {
    if (getAllPokemonQuery.isSuccess) {
      const allPokemon = getAllPokemonQuery.data;
      return allPokemon.filter((singlePokemon) =>
        singlePokemon.name.startsWith(search)
      );
    }
    return [];
  }, [getAllPokemonQuery.data, getAllPokemonQuery.isSuccess, search]);

  const pagesCount = Math.ceil(filteredPokemon.length / RESULTS_PER_PAGE) || 1;

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
    isSuccess: getAllPokemonQuery.isSuccess,
  };
};

export default usePokemonListPage;
