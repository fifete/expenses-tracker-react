import './App.css';
import { CategoryView } from './components/Category';
import { Home } from './components/Home';

function App() {
  return (
    <div className="Home">
      <Home />
      <CategoryView />
    </div>
  );
}

export default App;
