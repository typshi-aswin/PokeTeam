import React, { useEffect, useState } from 'react';
import { getPokemonList, getPokemonDetails } from '../api/pokeapi';
import PokemonCard from './PokemonCard';
import '../styles/pokemonGrid.css';


function PokemonGrid({ search }) {


  const [initialPokemon, setInitialPokemon] = useState([]);  // To hold the first 30 Pokémon
  const [allPokemonList, setAllPokemonList] = useState([]);  // Full Pokémon list for search
  const [filteredPokemon, setFilteredPokemon] = useState([]); // Search result Pokémon


  useEffect(() => {
    // Fetch initial 30 Pokémon only for display
    const loadInitialPokemons = async () => {
      const initialPokemons = await getPokemonList(); // This fetches all Pokémon by default
      const initialDetails = await Promise.all(
        initialPokemons.slice(0, 30).map(pokemon => getPokemonDetails(pokemon.url, false))
      );
      setInitialPokemon(initialDetails);
    };

    // Fetch full Pokémon list (for search functionality)
    const loadAllPokemons = async () => {
      const allPokemons = await getPokemonList();  // Same function for full list
      setAllPokemonList(allPokemons);
    };

    loadInitialPokemons();
    loadAllPokemons();
  }, []);

  useEffect(() => {
    // Filter Pokémon based on search term
    const filterPokemons = async () => {
      if (!search) {
        // If no search term, show only the first 30 Pokémon
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

  // If search term exists, show filtered results, otherwise show the first 30 Pokémon
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
