// /api/PokeAPI.js
import axios from 'axios';

export const getPokemonList = async () => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
  return res.data.results; // Array of { name, url }
};

// Accept an optional `fullStats` flag
export const getPokemonDetails = async (url, fullStats = false) => {
  const res = await axios.get(url);
  const data = res.data;

  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    image: data.sprites.front_default,
    types: data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', '),
    stats: fullStats ? data.stats : data.stats.filter(stat =>
      ['hp', 'attack', 'defense', 'speed'].includes(stat.stat.name)
    ),
  };
};
