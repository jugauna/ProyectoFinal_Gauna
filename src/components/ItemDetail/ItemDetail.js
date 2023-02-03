import './ItemDetail.css'
import { useContext, useState } from 'react'
/* import ItemCount from '../ItemCount/ItemCount' */
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import Swal from 'sweetalert2'

const ButtonCount = ({ onConfirm, stock, initial = 1 }) => {
    const [count, setCount] = useState(initial)

    const increment = () => {
        if(count < stock) {
            setCount(count + 1)
        }
    }
    const decrement = () => {
        if (count > 1)
            setCount(count - 1)
    }

    return (
        <div>
            <p>{count}</p>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
            <button className='button_agregar' onClick={() => onConfirm(count)}>Agregar al carrito</button>
        </div>
    )
}


const ItemDetail = ({ id, name, category, img, price, stock, description}) => {
    /* const [inputType, setInputType] = useState('button') */
    const [quantity, setQuantity] = useState(0)

    const ItemCount =  ButtonCount

    const { addItem, isInCart } = useContext(CartContext)
    /* const setNotification = useContext(NotificationContext) */

    const handleOnAdd = (quantity) => {
        console.log('agregue al carrito: ', quantity)

        setQuantity(parseInt(quantity))   
        
        addItem({ id, name, price, quantity, img})
        /* setNotification('error',`Produto agregado: ${quantity} ${name}`, 5) */
        Swal.fire({
            title: 'Producto agregado',
            text: (`Produto agregado: ${quantity} unidad/es de ${name}`),
            imageUrl:  img,
            icon: 'success',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            })
    }

    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Categoria: {category}
                </p>
                <p className="Info">
                    {description}
                </p>
                <p className="Info">Disponible: {stock}</p>
                <p className="Info">
                    Precio: {price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                {
                    isInCart(id) ?  (
                        <button className='button_carrito'><Link to='/cart'>Ir al Carrito de Compra</Link></button>
                    ) : (
                        <ItemCount stock={stock} onConfirm={handleOnAdd} />
                    )
                }
            </footer>
        </article>
    )
}

export default ItemDetail