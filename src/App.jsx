import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeamPage from './pages/TeamPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teampage" element={<TeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;
