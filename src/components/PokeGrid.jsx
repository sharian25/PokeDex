import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function PokeGrid() {
  const [offset, setOffset] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado

  const getAllPokemons = async (limit = 20) => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const res = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();
    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setPokemonData(results);
  };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  const handleOpen = (pokemon) => {
    setSelectedPokemon(pokemon); // Guarda el Pokémon seleccionado en el estado
  };

  const handleClose = () => {
    setSelectedPokemon(null); // Limpia el estado cuando se cierra el modal
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div className="pokeGrid">
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id} className="pokemon">
            <a onClick={() => handleOpen(pokemon)}>
              {" "}
              {/* Pasar el Pokémon como argumento */}
              <img
                className="pokeimg"
                src={pokemon.sprites.front_shiny}
                alt={`${pokemon.name} sprite`}
              />
              <h4 className="pokename">{pokemon.name}</h4>
              <h6 className="pokename">tipo: {pokemon.types[0].type.name}</h6>
            </a>
          </div>
        ))}
      </div>

      <Modal
        open={selectedPokemon !== null} // Abre el modal solo si hay un Pokémon seleccionado
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "rgb(34,193,195)",
            background:
              "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            fontWeight:'800',


          }}
        >
          {selectedPokemon && (
            <>
              <h2 id="parent-modal-title">{selectedPokemon.name}</h2>
              <img
                src={selectedPokemon.sprites.front_shiny}
                alt={`${selectedPokemon.name} sprite`}
              />
              <p id="parent-modal-description">
                Tipo: {selectedPokemon.types[0].type.name}
              </p>
              <p>
                Habilidades:{" "}
                {selectedPokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
              <p>Altura: {selectedPokemon.height}</p>
              <p>Peso: {selectedPokemon.weight}</p>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default PokeGrid;
