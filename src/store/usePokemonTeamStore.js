import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePokemonTeamStore = create(
  persist(
    (set, get) => ({
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

      reorderTeam: (newOrder) => set({ team: newOrder }),
    }),
    {
      name: 'pokemon-team', // 🧠 key in localStorage
      getStorage: () => localStorage,
    }
  )
);

export default usePokemonTeamStore;
