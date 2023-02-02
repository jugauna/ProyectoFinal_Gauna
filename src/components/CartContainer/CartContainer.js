import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
/* import { Link } from "react-router-dom" */
import { useNavigate } from 'react-router-dom'
import "./CartContainer.css"

 const CartContainer = ({ id, name, quantity, price }) => {
    const navigate = useNavigate()
    const { deleteItem } = useContext(CartContext)
    const { cart } = useContext(CartContext)

    const handleDeleteItem = () => {
        deleteItem(id)
        /* setNotification('error',`Se borro ${name} del carrito`, 5) */
    }

    return (
        /* <div>
            <h1>Este es su Carrito de Compra</h1>
            <div> */
                
                   /*  cart.map(prod => {
                        return ( */
                            
                            /* <h2 key={prod.id}>{prod.name}</h2> */
                        <>    
                            <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{quantity}</td>
                            <td>${price}</td>
                            <td>${price * quantity}</td>
                            <td><button className='Button' onClick={() => navigate(`/detail/${id}`)}>Detalle</button></td>
                            <td><button className='Button' onClick={handleDeleteItem}>Borrar</button></td>
                            </tr>                            
                        </>
                        
                        
                  /*   })
                } */
            /* <div>            
            <Link to='/checkout'>Checkout</Link>
            </div> */
    )
    
            }

export default CartContainer 

/* const CartContainer = ({ id, name, quantity, price }) => {
    const navigate = useNavigate()
    const { deleteItem } = useContext(CartContext)
    const setNotification  = useContext(NotificationContext)

    const handleDeleteItem = () => {
        deleteItem(id)
        setNotification('error',`Se borro ${name} del carrito`, 5)
    }

    return (
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>${price}</td>
                <td>${price * quantity}</td>
                <td><button className='Button' onClick={() => navigate(`/detail/${id}`)}>Detalle</button></td>
                <td><button className='Button' onClick={handleDeleteItem}>Borrar</button></td>
            </tr>
        </>

    );
} */

//export default CartContainer