import './ItemDetail.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
            <button onClick={() => onConfirm(count)}>Agregar al carrito</button>
        </div>
    )
}


const ItemDetail = ({ id, name, category, img, price, stock, description}) => {
    
    const [quantity, setQuantity] = useState(0)

    const ItemCount = ButtonCount 

    const handleOnAdd = (quantity) => {
        

        setQuantity(parseInt(quantity))
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
                <p className="Info">
                    Precio: {price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                {
                    quantity > 0 ? (
                        <Link to='/cart'>Terminar compra</Link>
                    ) : (
                        <ItemCount stock={stock} onConfirm={handleOnAdd} />
                    )
                }
            </footer>
        </article>
    )
}

export default ItemDetail