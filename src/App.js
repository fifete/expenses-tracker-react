import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CategoryView } from './components/Category';
import { Home } from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/other-page" element={<CategoryView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

