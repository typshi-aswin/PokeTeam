import React, { useEffect, useState } from 'react';
import { getPokemonList, getPokemonDetails } from '../api/pokeapi';
import PokemonCard from './PokemonCard';
import '../styles/pokemonGrid.css';


function PokemonGrid({ search }) {


  const [initialPokemon, setInitialPokemon] = useState([]);  // to hold the first 30 pokemon
  const [allPokemonList, setAllPokemonList] = useState([]);  // full pokemon list for search
  const [filteredPokemon, setFilteredPokemon] = useState([]); // search result pokemon


  useEffect(() => {
    // initial fetch 30 Pokemon only for display
    const loadInitialPokemons = async () => {
      const initialPokemons = await getPokemonList(); //this fetch all pokemon by default
      const initialDetails = await Promise.all(
        initialPokemons.slice(0, 30).map(pokemon => getPokemonDetails(pokemon.url, false))
      );
      setInitialPokemon(initialDetails);
    };

    // this is for search functionality fetch all pokemon
    const loadAllPokemons = async () => {
      const allPokemons = await getPokemonList();  
      setAllPokemonList(allPokemons);
    };

    loadInitialPokemons();
    loadAllPokemons();
  }, []);

  useEffect(() => {
    //pokemon filtering
    const filterPokemons = async () => {
      if (!search) {
        // iff no search term, show only the first 30 Pokemon
        setFilteredPokemon([]);
        return;
      }

      const matchedPokemons = allPokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 30); // Limit to top 30 results for search

      const details = await Promise.all(
        matchedPokemons.map(pokemon => getPokemonDetails(pokemon.url, false))
      );
      setFilteredPokemon(details);
    };

    filterPokemons();
  }, [search, allPokemonList]);

  // if search term exists, show filtered results, otherwise show the first 30 Pokemon
  const pokemonToDisplay = search ? filteredPokemon : initialPokemon;

  return (
    <div className="grid-container">


      {pokemonToDisplay.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
          stats={pokemon.stats}
          id={pokemon.id}
        />
      ))}
       
    </div>
  );
}

export default PokemonGrid;
