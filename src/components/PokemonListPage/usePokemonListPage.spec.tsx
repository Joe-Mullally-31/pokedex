import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createWrapper } from "../../utils/testUtils";
import usePokemonListPage, { Pokemon } from "./usePokemonListPage";

beforeEach(() => {
  fetchMock.resetMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

const slowbro = { name: "slowbro", url: "slowbro-url" };
const ivysaur = { name: "ivysaur", url: "ivysaur-url" };
const charmander = { name: "charmander", url: "charmander-url" };

describe("usePokemonList", () => {
  describe("paginatedFilteredPokemon", () => {
    it("should return a list of pokemon filtered by search", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ results: [slowbro, ivysaur, charmander] })
      );
      const { result } = renderHook(() => usePokemonListPage(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.paginatedFilteredPokemon).toStrictEqual([
        slowbro,
        ivysaur,
        charmander,
      ]);

      act(() => {
        result.current.setSearch("s");
      });

      expect(result.current.paginatedFilteredPokemon).toStrictEqual([slowbro]);
    });

    it("should paginate the list of pokemon", async () => {
      // "20 Slowbro and 1 Charmander"
      const apiResult = Array<Pokemon>(20).fill(slowbro);
      apiResult.push(charmander);
      fetchMock.mockResponseOnce(JSON.stringify({ results: apiResult }));

      const { result } = renderHook(() => usePokemonListPage(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.paginatedFilteredPokemon).toStrictEqual(
        Array(20).fill(slowbro)
      );

      act(() => {
        result.current.setPage(2);
      });

      expect(result.current.paginatedFilteredPokemon).toStrictEqual([
        charmander,
      ]);
    });
  });

  describe("pagesCount", () => {
    it("should return page count", async () => {
      const apiResult = Array<Pokemon>(20).fill(slowbro);
      apiResult.push(charmander);
      fetchMock.mockResponseOnce(JSON.stringify({ results: apiResult }));
      const { result } = renderHook(() => usePokemonListPage(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.pagesCount).toBe(2);

      act(() => {
        result.current.setSearch("s");
      });

      expect(result.current.pagesCount).toBe(1);

      act(() => {
        result.current.setSearch("st");
      });

      expect(result.current.pagesCount).toBe(1);
    });
  });

  describe("setPage", () => {
    it("should update the page when setPage called", async () => {
      const apiResult = Array<Pokemon>(20).fill(slowbro);
      apiResult.push(charmander);
      fetchMock.mockResponseOnce(JSON.stringify({ results: apiResult }));
      const { result } = renderHook(() => usePokemonListPage(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.page).toBe(1);

      act(() => {
        result.current.setPage(2);
      });

      expect(result.current.pagesCount).toBe(2);
    });
  });
});
