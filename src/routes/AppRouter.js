import { Routes, Route } from 'react-router-dom'
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Checkout/Checkout';


const AppRouter = () => {
    return (
       <Routes>
            <Route path='/' element={<ItemListContainer greeting='Todos nuestro productos'/>}/>
            <Route path='/category/:categoryId' element={<ItemListContainer greeting='Productos filtrados'/>} />
            <Route path='/detail/:productId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/checkout' element={<Checkout />} />
        </Routes> 
    )
}

export default AppRouter