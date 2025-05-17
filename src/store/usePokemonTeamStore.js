import { create } from 'zustand';

const usePokemonTeamStore = create((set, get) => ({
  team: [],
  
  addToTeam: (pokemon) => {
    const currentTeam = get().team;

    if (currentTeam.find(p => p.id === pokemon.id)) return 'already';
    if (currentTeam.length >= 6) return 'full';

    set({ team: [...currentTeam, pokemon] });
    return 'added';
  },

  removeFromTeam: (id) => {
    const updatedTeam = get().team.filter(p => p.id !== id);
    set({ team: updatedTeam });
  },

  clearTeam: () => set({ team: [] }),
}));

export default usePokemonTeamStore;
