import React from 'react';
import usePokemonTeamStore from '../store/usePokemonTeamStore';
import '../styles/selectedPokemonsCard.css';
import { useNavigate } from 'react-router-dom';

function SelectedPokemonsCard() {
 const selectedTeam = usePokemonTeamStore((state) => state.team);
const removePokemon = usePokemonTeamStore((state) => state.removeFromTeam);

const navigate = useNavigate();
   const handleClick = () => {
     navigate('/');
   };

  return (
    <div className="selected-team-card">
      <div className="heading-container">
      <h2>Your Team ({selectedTeam.length}/6)</h2>
      <button className="backtohome" onClick={handleClick}>Back to Home</button>
      </div>
      <div className="team-pokemon-list">
        {selectedTeam.length === 0 && <p>No Pokémon added yet.</p>}
        {selectedTeam.map((pokemon) => (
          <div key={pokemon.id} className="team-pokemon-card">
            <div className="img-container">
            <img src={pokemon.image} alt={pokemon.name} />
            </div>
            <h3>{pokemon.name}</h3>
            <button className="remove-button" onClick={() => removePokemon(pokemon.id)}>
              Remove
            </button>
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedPokemonsCard;
