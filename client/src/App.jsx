import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import './App.css';

export const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Learning Pathway Creator</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
