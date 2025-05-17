import React from 'react';
import SelectedPokemonsCard from '../components/SelectedPokemonsCard';
import TeamStatsCard from '../components/TeamStatsCard';
import PokemonIndividualStatsCard from '../components/PokemonIndividualStatsCard.jsx';
import '../styles/globals.css';
import TypeAnalysisCard from '../components/TypeAnalysisCard.jsx';

// import other cards here...

function TeamPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',boxSizing: 'border-box' }}>
    <div className="team-page-container">

      <SelectedPokemonsCard />
      <PokemonIndividualStatsCard />
      <TeamStatsCard />
      <TypeAnalysisCard />

    </div>
    </div>
  );
}

export default TeamPage;
