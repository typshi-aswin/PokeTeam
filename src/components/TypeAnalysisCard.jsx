import React from 'react';
import usePokemonTeamStore from '../store/usePokemonTeamStore';
import typeEffectiveness from "../data/typeEffectiveness"; // this is where the data of weaknesses and resistances of different types are stored.
import '../styles/typeAnalysisCard.css';

function TypeAnalysisCard() {
  const team = usePokemonTeamStore((state) => state.team);

  const typeCounter = {
    weaknesses: {},
    resistances: {},
  };
  

  team.forEach(pokemon => {
    

    const typesArray = typeof pokemon.types === "string"
    ? pokemon.types.split(',').map(t => t.trim())
    : pokemon.types;
    typesArray.forEach(type => {
    const { weakTo, resistantTo } = typeEffectiveness[type.toLowerCase()] || {};

    if (weakTo) {
      weakTo.forEach(w => {
        typeCounter.weaknesses[w] = (typeCounter.weaknesses[w] || 0) + 1;
      });
    }

    if (resistantTo) {
      resistantTo.forEach(r => {
        typeCounter.resistances[r] = (typeCounter.resistances[r] || 0) + 1;
      });
    }
  });
});

  const getTopTwo = (obj) => {
    return Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
  };

  const topWeaknesses = getTopTwo(typeCounter.weaknesses);
  const topResistances = getTopTwo(typeCounter.resistances);
 

  return (
    <div className="type-analysis-card">
      <h2>Type Analysis</h2>
      <div className="type-analysis-container">
        <div className="type-column">
          <h3>Weaknesses</h3>
          {topWeaknesses.map(([type, count]) => (
           <div key={type} className="type-entry">
              <span className="type-name">{type}</span>
              <span className="type-value">{count}×</span>
            </div>
          ))}
        </div>

        <div className="type-column">
          <h3>Resistances</h3>
          {topResistances.map(([type, count]) => (
            <div key={type} className="type-entry">
              <span className="type-name">{type}</span>
              <span className="type-value">{count}×</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TypeAnalysisCard;
