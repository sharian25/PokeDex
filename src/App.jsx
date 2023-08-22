import { useState } from "react";
import axios from "axios";
import "./App.css";
import Pokecards from "./components/Pokecards";
import PokeGrid from "./components/PokeGrid";

function App() {
const [pokemon, setPokemon] = useState("");
const [nombrePokemon, setNombrePokemon] = useState("");

const obtenerPokemon =()=> {axios.get("https://pokeapi.co/api/v2/pokemon/"+nombrePokemon)
  .then(function (response) {
    console.log(response.data);
    setPokemon(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {});
};
console.log(obtenerPokemon)
  return (
    <>
  
   <div className="pokebusca">
   <input placeholder="ingrese el nombre del pokemon" 
      onChange={(e)=>setNombrePokemon(e.target.value)}/>
      <button onClick={obtenerPokemon}>Buscar</button>
</div>

       <div className="pokecards">
      {pokemon && 
      <> 
        <h1>{pokemon.name}</h1>
      <h2>{pokemon.id}</h2>
      <img src={pokemon.sprites.front_shiny} />
      <h2>{pokemon.abilities[1].ability.name}</h2>
      <h2>{pokemon.types[0].type.name}</h2>

      </>}
      
    </div>
     <PokeGrid pokemonData={pokemon}/>
    </>
  );
}

export default App;

