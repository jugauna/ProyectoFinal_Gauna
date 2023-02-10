import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { useNavigate } from 'react-router-dom'
import "./CartContainer.css"
import Swal from 'sweetalert2'

 const CartContainer = ({ id, name, quantity, price, img }) => {
    const navigate = useNavigate()
    const { deleteItem } = useContext(CartContext) 

    const handleDeleteItem = () => {
        Swal.fire({
            title: 'Producto ELIMINADO:',
            text: (`${quantity} unidad/es de ${name}`),
            imageUrl:  img, 
            icon: 'success',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Custom image',
            })
        deleteItem(id)        
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
                        
                        
    )    
}

export default CartContainer