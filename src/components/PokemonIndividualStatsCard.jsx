import React, { useState } from 'react';
import usePokemonTeamStore from '../store/usePokemonTeamStore';
import '../styles/pokemonIndividualStatsCard.css';

function PokemonIndividualStatsCard() {
  const team = usePokemonTeamStore(state => state.team);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (team.length === 0) return <div className="individual-stats-card">No Pokémon in team.</div>;

  const currentPokemon = team[currentIndex];

  const nextPokemon = () => {
    setCurrentIndex((prev) => (prev + 1) % team.length);
  };

  const prevPokemon = () => {
    setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);
  };

  return (
    <div className="individual-stats-card">
      <h2>Pokemon Details</h2>

      <div className="image-container">
        <button className="arrow" onClick={prevPokemon}>←</button>
        <img src={currentPokemon.image} alt={currentPokemon.name} />
        <button className="arrow" onClick={nextPokemon}>→</button>
      </div>

      <div className="stats-container">
        {currentPokemon.stats.slice(0, 4).map((statObj, idx) => (
          <div className="stat-row" key={idx}>
            <span>{statObj.stat.name.toUpperCase()}</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(statObj.base_stat / 150) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonIndividualStatsCard;
