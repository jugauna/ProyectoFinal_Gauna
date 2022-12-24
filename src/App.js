import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import CartWidget from './components/CartWidget/CartWidget';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {
  return (
    <div className='App'>
      <header className="App-header">
        <Navbar />        
        <ItemListContainer greeting='Esta es la tienda'/>
        <img src={logo} className="App-logo" alt="logo" />        
      </header>
    </div>
  );
}


export default App;