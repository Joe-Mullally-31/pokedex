import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import capitaliseString from "../../utils/capitaliseFirstLetter";

export type PokemonType = {
  slot: number;
  type: Type;
};

type Type = {
  name: string;
  url: string;
};

type Sprites = {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
};

type PokemonStats = {
  name: string;
  types: PokemonType[];
  sprites: Sprites;
};

const usePokemonDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [typeDescription, setTypeDescription] = useState<string>();
  const [displaySprite, setDisplaySprite] = useState<string>();
  const [displayName, setDisplayName] = useState<string>();
  const [showShiny, setShowShiny] = useState<boolean>(false);
  const [showBack, setShowBack] = useState<boolean>(false);

  const { search } = useLocation();

  const memo = useMemo(() => new URLSearchParams(search), [search]);
  const pokemonName = memo.get("name") || undefined;

  const getDisplaySpriteForToggles = useCallback(
    (pokemonSprites: Sprites) => {
      if (showShiny && showBack) {
        return pokemonSprites.back_shiny;
      }
      if (showShiny && !showBack) {
        return pokemonSprites.front_shiny;
      }
      if (!showShiny && showBack) {
        return pokemonSprites.back_default;
      }
      if (!showShiny && !showBack) {
        return pokemonSprites.front_default;
      }
    },
    [showShiny, showBack]
  );

  const generateTypeDescription = (pokemonTypes: PokemonType[]) =>
    `Type${pokemonTypes.length > 1 ? "s" : ""} : ${pokemonTypes
      .map((pokemonType: PokemonType) =>
        capitaliseString(pokemonType.type.name)
      )
      .join(", ")}`;

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        setTypeDescription(generateTypeDescription(data.types));
        setDisplayName(capitaliseString(data.name));
        setDisplaySprite(getDisplaySpriteForToggles(data.sprites));
      });
    setLoading(false);
  }, [getDisplaySpriteForToggles, pokemonName]);

  const toggleShiny = () => setShowShiny(!showShiny);
  const toggleBack = () => setShowBack(!showBack);

  return {
    loading,
    typeDescription,
    displayName,
    displaySprite,
    showShiny,
    toggleShiny,
    showBack,
    toggleBack,
  };
};

export default usePokemonDetailsPage;
