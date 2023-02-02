import './App.css';
//import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
//import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './notification/NotificationService';
/* import CartContainer from './components/CartContainer/CartContainer'; */
//import Checkout from './components/Checkout/Checkout';
//import Cart from './components/Cart/Cart';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="App"> 
    <NotificationProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
          {/* <Routes>
            <Route path='/' element={<ItemListContainer greeting='Todos los Electrodomésticos'/>}/>
            <Route path='/category/:categoryId' element={<ItemListContainer greeting='Productos por Categoría'/>} />
            <Route path='/detail/:productId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart/>} />
            
            <Route path='/checkout' element={<Checkout />} />
          </Routes>  */}
        </BrowserRouter>
      </CartProvider>  
    </NotificationProvider>
    </div>
  );
}

export default App;