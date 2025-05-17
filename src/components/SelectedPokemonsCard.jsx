import React from 'react';
import usePokemonTeamStore from '../store/usePokemonTeamStore';
import '../styles/selectedPokemonsCard.css';
import { useNavigate } from 'react-router-dom';

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

function SelectedPokemonsCard() {
  const selectedTeam = usePokemonTeamStore((state) => state.team);
  const removePokemon = usePokemonTeamStore((state) => state.removeFromTeam);
  const reorderTeam = usePokemonTeamStore((state) => state.reorderTeam);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  // 👇 Updated sensors for better mobile dragging
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // starts drag after 10px movement
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = selectedTeam.findIndex((p) => p.id === active.id);
    const newIndex = selectedTeam.findIndex((p) => p.id === over.id);

    reorderTeam(arrayMove(selectedTeam, oldIndex, newIndex));
  };

  return (
    <div className="selected-team-card">
      <div className="heading-container">
        <h2>Your Team ({selectedTeam.length}/6)</h2>
        <button className="backtohome" onClick={handleClick}>
          Back to Home
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={selectedTeam.map((p) => p.id)} strategy={horizontalListSortingStrategy}>
          <div className="team-pokemon-list">
            {selectedTeam.length === 0 && <p>No Pokémon added yet.</p>}
            {selectedTeam.map((pokemon) => (
              <SortableItem key={pokemon.id} pokemon={pokemon} removePokemon={removePokemon} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableItem({ pokemon, removePokemon }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: pokemon.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none', // 👈 important to prevent scroll conflict on mobile
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="team-pokemon-card">
      <div className="img-container">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <h3>{pokemon.name}</h3>
      <button className="remove-button" onClick={() => removePokemon(pokemon.id)}>
        Remove
      </button>
    </div>
  );
}

export default SelectedPokemonsCard;











































/** 
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
**/
