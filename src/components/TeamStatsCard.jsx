import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import usePokemonTeamStore from '../store/usePokemonTeamStore';
import '../styles/TeamStatsCard.css';




function TeamStatsCard() {
  const team = usePokemonTeamStore(state => state.team);
 
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--heading-color');
  const strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  // Fancy calculations based on Pokémon stats
  const stats = {
    hpDurability: 0,
    physicalOffense: 0,
    specialOffense: 0,
    physicalDefense: 0,
    specialDefense: 0,
    speedAdvantage: 0,
  };

  if (team.length > 0) {
    team.forEach(pokemon => {
      console.log("Full stats array:", pokemon.stats);
      pokemon.stats.forEach(stat => {
        const value = stat.base_stat;
         
        switch (stat.stat.name) {
          case 'hp':
            stats.hpDurability += value;
            break;
          case 'attack':
            stats.physicalOffense += value;
            break;
          case 'special-attack':
            stats.specialOffense += value;
            
            break;
          case 'defense':
            stats.physicalDefense += value;
            break;
          case 'special-defense':
            stats.specialDefense += value;
            break;
          case 'speed':
            stats.speedAdvantage += value;
            break;
          default:
            break;
        }
      });
    });

    // Normalize by team size
    Object.keys(stats).forEach(key => {
      stats[key] = Math.floor(stats[key] / team.length);
    });
  }

  const data = [
    { stat: 'HP Durability', value: stats.hpDurability },
    { stat: 'Physical Offense', value: stats.physicalOffense },
    { stat: 'Special Offense', value: stats.specialOffense },
    { stat: 'Physical Defense', value: stats.physicalDefense },
    { stat: 'Special Defense', value: stats.specialDefense },
    { stat: 'Speed Advantage', value: stats.speedAdvantage },
  ];

  return (
    <div className="team-stats-card">
      <h2>Team Battle Stats</h2>
      <RadarChart outerRadius={90} width={400} height={400} data={data} >
        <PolarGrid stroke={bgColor}/>
        <PolarAngleAxis dataKey="stat" stroke={bgColor}/>
        <PolarRadiusAxis angle={30} domain={[0, 150]} stroke={bgColor} />
        <Radar name="Team Stats" dataKey="value" stroke={strokeColor} fill={bgColor} fillOpacity={0.6} />
        <Tooltip />
      </RadarChart>
    </div>
  );
}

export default TeamStatsCard;
