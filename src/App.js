import './App.css';
import { Category } from './components/Category';
import { Home } from './components/Home';

function App() {
  return (
    <div className="Home">
      <Home />
      <Category />
    </div>
  );
}

export default App;
