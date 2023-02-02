import './CartWidget.css'

const CartWidget = ({ totalQuantity }) => {
    return (
        <div className='menu_carrito'>
        <button className='boton_carrito'> <img className="carrito" src='../images/cart.svg' alt='cart-widget'/>{ totalQuantity } </button>
                       
        </div>
    )
}

export default CartWidget