import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
//import CartList from "../CartList/CartList"

//import { useState,useContext } from 'react' 
import { useNavigate } from "react-router-dom"
//import ItemCart from '../ItemCart/ItemCart'
import CartContainer from '../CartContainer/CartContainer'
//import Loading from '../Loading/Loading'
//import { CartContext } from '../../context/CartContext'
//import { NotificationContext } from "../../notification/NotificationService";
import "../Cart/Cart.css"
import { Link } from "react-router-dom" 




/* const Cart = () => {

    const [loading] = useState(false)

    const { cart } = useContext(CartContext)

    return (
        <div>
            <h1>Estos son los productos de tu carrito</h1>
            <CartList cart={cart}/>
        </div>
    )
}
export default Cart */






const Cart = () => {
    /* const [loading] = useState(false) */

    const navigate = useNavigate()
    const { totalQuantity,total ,cart/* ,clearAll */} = useContext(CartContext)
    
    /* const  setNotification  = useContext(NotificationContext) */

     /* const handleClear = () => {
        clearAll()
       setNotification('error',`Se vacio el carrito`, 5) 
    }*/

    /* if(loading) {
        return (<Loading></Loading>)
    } */


   if(!totalQuantity) {
        return (
            <div className='cart-container'>
                <header className="Header">
                    <h2 className="ItemHeader">
                        Carrito Vacio
                    </h2>
                </header>
                <div>
                    <button className="Button2" onClick={() => navigate('/')}>
                        Buscar productos
                    </button>
                </div>
            </div>
        )
    } 


    return (
        <>
            <div>
            <h1>Este es su Carrito de Compra</h1>
            </div>

            <div className='cart-container'>
                <table>
                    <tr>
                        <th>#ID</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {cart.map(prod => <CartContainer key={prod.id} {...prod}/>)} 
                </table>
            </div>
            
            
                <div className='check-out'>
                    <p className='check-out__total-price'>El total de tu compra es ${total}</p>
                     <div className='check-out__btn'>
                        <Link to='/checkout'><button className="Button" variant="contained">Finalizar compra</button></Link>
                        {/* <button className="Button" variant="outlined" onClick={handleClear}>Eliminar todo</button> */} 
                    </div> 
                </div>

        </>
    )    
    
    
}

export default Cart