// Native Hooks
import { useState, useEffect } from "react";

// Components
import CardPokemon from "../../components/cardPokemon/CardPokemon";
import Spin from "../../components/spin/spin";

// Style
import "./homePage.css";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [selectedPokemonName, setSelectedPokemonName] = useState("");
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    hp: "",
    type: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    async function fetchPokemonOptions() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
      const data = await res.json();

      const addedNames = pokemons.map((p) => p.name);
      const filtered = data.results
        .map((p) => p.name)
        .filter((name) => !addedNames.includes(name));

      setPokemonOptions(filtered);
    }

    if (isModalOpen) {
      fetchPokemonOptions();
    }
  }, [isModalOpen, pokemons]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await res.json();

        const detailedPromises = data.results.map(async (pokemon) => {
          const resDetails = await fetch(pokemon.url);
          const details = await resDetails.json();

          const resSpecies = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${details.id}`
          );
          const species = await resSpecies.json();

          const descriptionEntry = species.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          );

          if (details.sprites.front_default) {
            await new Promise((resolve) => {
              const img = new Image();
              img.src = details.sprites.front_default;
              img.onload = resolve;
              img.onerror = resolve;
            });
          }

          return {
            name: details.name,
            hp: details.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
            type: details.types[0]?.type.name || "unknown",
            image: details.sprites.front_default,
            description: descriptionEntry
              ? descriptionEntry.flavor_text.replace(/\f|\n/g, " ")
              : "No description found.",
          };
        });

        const fullData = await Promise.all(detailedPromises);
        setPokemons(fullData);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  async function handlePokemonSelect(e) {
    const name = e.target.value;
    setSelectedPokemonName(name);

    try {
      const resDetails = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const details = await resDetails.json();

      const resSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${details.id}`
      );
      const species = await resSpecies.json();

      const descriptionEntry = species.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );

      if (details.sprites.front_default) {
        await new Promise((resolve) => {
          const img = new Image();
          img.src = details.sprites.front_default;
          img.onload = resolve;
          img.onerror = resolve;
        });
      }

      setNewPokemon({
        name: details.name,
        hp: details.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
        type: details.types[0]?.type.name || "unknown",
        image: details.sprites.front_default,
        description: descriptionEntry
          ? descriptionEntry.flavor_text.replace(/\f|\n/g, " ")
          : "No description found.",
      });
    } catch (error) {
      alert("Erro ao buscar Pokémon selecionado:", error);
    }
  }

  function removePokemon(name) {
    setPokemons((prev) => prev.filter((p) => p.name !== name));
  }

  function handleSave() {
    setPokemons((prev) => [...prev, newPokemon]);
    setNewPokemon({
      name: "",
      hp: "",
      type: "",
      image: "",
      description: "",
    });
    setSelectedPokemonName("");
    setIsModalOpen(false);
  }

  function handleCancel() {
    setNewPokemon({
      name: "",
      hp: "",
      type: "",
      image: "",
      description: "",
    });
    setSelectedPokemonName("");
    setIsModalOpen(false);
  }

  return (
    <main className="flex flex-col items-center m-3 gap-5">
      <div className="flex justify-end mr-10px w-full">
        <button
          className="rounded-2xl bg-green-400 text-white font-bold text-[20px] cursor-pointer hover:bg-green-700 btnAdd"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Pokémon
        </button>
      </div>

      {isLoading ? (
        <Spin></Spin>
      ) : (
        <div className="flex justify-center flex-wrap gap-5">
          {pokemons.map((pokemon) => (
            <div key={pokemon.name}>
              <CardPokemon
                name={pokemon.name}
                type={pokemon.type}
                description={pokemon.description}
                hp={pokemon.hp}
                image={pokemon.image}
              />
              <button
                className="btnDelete"
                onClick={() => removePokemon(pokemon.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.7 10.3 48 12 48 L 38 48 C 39.7 48 41 46.7 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 19 14 C 19.6 14 20 14.4 20 15 L 20 40 C 20 40.6 19.6 41 19 41 C 18.4 41 18 40.6 18 40 L 18 15 C 18 14.4 18.4 14 19 14 z M 25 14 C 25.6 14 26 14.4 26 15 L 26 40 C 26 40.6 25.6 41 25 41 C 24.4 41 24 40.6 24 40 L 24 15 C 24 14.4 24.4 14 25 14 z M 31 14 C 31.6 14 32 14.4 32 15 L 32 40 C 32 40.6 31.6 41 31 41 C 30.4 41 30 40.6 30 40 L 30 15 C 30 14.4 30.4 14 31 14 z"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 p-5 flex justify-center items-center z-10 bg-opacity-50"
          onClick={handleCancel}
        >
          <div
            className="bg-gray-400 rounded-2xl shadow-lg w-96 space-y-3 z-1000 p-5 modal"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-3"
            >
              <h2 className="text-xl font-bold">Selecionar Pokémon</h2>

              <select
                value={selectedPokemonName}
                onChange={handlePokemonSelect}
                className="w-full p-2 border rounded bg-white cursor-pointer"
                required
              >
                <option value="" disabled>
                  -- Selecione um Pokémon --
                </option>
                {pokemonOptions.map((name) => (
                  <option key={name} value={name}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </option>
                ))}
              </select>

              <input
                name="hp"
                value={newPokemon.hp}
                placeholder="HP"
                disabled
                className="w-full p-2 border rounded bg-gray-100 inputText"
              />
              <input
                name="type"
                value={newPokemon.type}
                placeholder="Tipo"
                disabled
                className="w-full p-2 border rounded bg-gray-100 inputText"
              />
              <input
                name="image"
                value={newPokemon.image}
                placeholder="URL da imagem"
                disabled
                className="w-full p-2 border rounded bg-gray-100 inputText"
              />
              <textarea
                name="description"
                value={newPokemon.description}
                placeholder="Descrição"
                disabled
                className="w-full p-2 border rounded bg-gray-100 inputText"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-3 py-1 border bg-red-600 text-white rounded hover:bg-red-700 btn"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 btn"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
