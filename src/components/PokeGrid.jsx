import React, { useState, useEffect } from 'react';

function PokeGrid() {
  const [offset, setOffset] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);

  const getAllPokemons = async (limit = 20) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);
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

  return (
    <div className='pokeGrid'>
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className='pokemon'>
          <img className='pokeimg' src={pokemon.sprites.front_shiny} alt={`${pokemon.name} sprite`} />
          <h4 className='pokename' >{pokemon.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default PokeGrid;