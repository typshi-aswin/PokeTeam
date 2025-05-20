import React, { useState } from 'react';
import usePokemonTeamStore from '../store/usePokemonTeamStore';
import { getPokemonDetails } from '../api/pokeapi'; 
import '../styles/pokemonCard.css';

function PokemonCard({ name, image, types, stats, id }) {
  const addToTeam = usePokemonTeamStore(state => state.addToTeam);
  const [buttonText, setButtonText] = useState('Add To Team');

  const handleAdd = async () => {
    try {
      // here i fetch full details to ensure all 6 stats are present
      const fullDetails = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`, true);

      const result = addToTeam({
        id: fullDetails.id,
        name: fullDetails.name,
        image: fullDetails.image,
        types: fullDetails.types,
        stats: fullDetails.stats,
      });

      if (result === 'already') {
        setButtonText('Already Added');
      } else if (result === 'full') {
        setButtonText('Team is Full');
      } else if (result === 'added') {
        setButtonText('Added!');
      }

    } catch (err) {
      console.error('Failed to fetch full Pokémon details:', err);
      setButtonText('Error!');
    }

    setTimeout(() => {
      setButtonText('Add To Team');
    }, 2000);
  };

  return (
    <div className="card">
      <div className="container-1">
        <h3>{name}</h3>
        <span>Type: {types}</span>

        <div className="stats-container"> 
          <span>Stats</span>
          <div className="stats">
            {stats.map((statObj, idx) => (
              <p key={idx}>
                {statObj.stat.name.toUpperCase()}: {statObj.base_stat}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="container-2">
        <img src={image} alt={name} />
      </div>

      <button className="add-button" onClick={handleAdd}>{buttonText}</button>
    </div>
  );
}

export default PokemonCard;














