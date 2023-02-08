import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CategoryView } from './components/Category';
import { Home } from './components/Home';
import { ComingSoon } from './components/ComingSoon';
import { Stats } from './components/Stats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/category" element={<CategoryView />} />
        <Route exact path="/stats" element={<Stats />} />
        <Route exact path="/coming" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

