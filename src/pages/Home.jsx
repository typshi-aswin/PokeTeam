import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PokemonGrid from '../components/PokemonGrid';



function Home() {
  const [search, setSearch] = useState('');

    return (
        <> 
        
        <div className="home-container">
           
            <Navbar />
            <Hero search={search} setSearch={setSearch} />
            
            <PokemonGrid search={search} />
            
           
        </div>

        </>
    );
}

export default Home;
