
//import Button from './components/Button/Button';
//import CartWidget from './components/CartWidget/CartWidget';
//import ItemListContainer from './components/ItemListContainer/ItemListContainer';

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
        
        
        <img src={logo} className="App-logo" alt="logo" />        
      </header>
    </div>
  );
}


//function App() {
//  return (
//    <>
//    <Navbar />
//    <CartWidget />
//    </>
//  );
//}

export default App;