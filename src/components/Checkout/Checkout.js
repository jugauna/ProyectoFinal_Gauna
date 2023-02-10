import { collection, query, where, documentId, getDocs, writeBatch, addDoc } from "firebase/firestore"
import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from "../../services/firebase/firebaseConfig"
import { useNavigate } from "react-router-dom"
import './Checkout.css'


const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [direction,setDirection] = useState('')
    const [orderId, setOrderId] = useState('')
    const {cart, total, clearCart } = useContext(CartContext)

    const navigate = useNavigate()

    const createOrder = async () => {
        setLoading(true)
        try {
            const objOrder = {
                buyer: {                    
                    name,
                    phone,
                    email,
                    direction                
                },
                items: cart,
                total
            }
    
            const batch = writeBatch(db)    
            const ids = cart.map(prod => prod.id)    
            const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))  
            const productsAddedToCartFromFirestore = await getDocs(productsRef)
            const { docs } = productsAddedToCartFromFirestore
            const outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock
    
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart.quantity
    
                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity})
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })
    
            if(outOfStock.length === 0) {
                await batch.commit()    
                const orderRef = collection(db, 'orders')    
                const orderAdded = await addDoc(orderRef, objOrder)    
                const { id } = orderAdded
                setOrderId(id)

                clearCart()

                setTimeout(() => {
                    navigate('/')
                }, 5000)

                console.log(id)
            } else {
                console.error('hay productos fuera de stock')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }       
    }

    if(loading) {
        return <h1>Generando Orden de Compra...</h1>
    }

    if(orderId) {
        return (
            <div>
                <h2>Muchas Gracias por su Compra!!!</h2>
                <h3> El Id de su orden de Compra es: {orderId}</h3>
            </div>
        )
    }

    if(cart.length === 0) {
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
    <div class="container">
        <div class="row">
            <div class="col">               
                <div class="shadow-lg p-3 mb-5 mt-4 bg-body rounded">                                    
                    <div class="formulario p-3 mb-2 bg-primary bg-gradient fw-bold text-white">Datos de Contacto</div>
                    <form class="form-horizontal row g-3 needs-validation" novalidate>
                        <div class="col-md-6 position-relative">
                            <label for="nombre" class="form-label">Nombre y Apellido *</label>
                            <input type="text" class="form-control" id="nombre" value={name} required onChange={(event) => setName(event.target.value)} />
                            
                            <div class="valid-tooltip">¡Campo válido!</div>
                            <div class="invalid-tooltip">Debe completar los datos.</div>
                        </div>
                        <div class="col-md-6 position-relative">
                            <label for="apellido" class="form-label">Telefono *</label>
                            <input type="text" class="form-control" id="telefono" value={phone} required onChange={(event) => setPhone(event.target.value)}/>
                            
                            <div class="valid-tooltip">¡Campo válido!</div>
                            <div class="invalid-tooltip">Debe completar los datos.</div>
                        </div> 
                        <div class="col-md-6 position-relative">
                            <label for="mail" class="form-label">Mail *</label>
                            <input type="email" class="form-control" id="Mail" value={email} required onChange={(event) => setEmail(event.target.value)}/>
                            
                            <div class="valid-tooltip">¡Campo válido!</div>
                            <div class="invalid-tooltip">Debe completar los datos.</div>
                        </div>
                        <div class="col-md-6 position-relative">
                            <label for="apellido" class="form-label">Dirección *</label>
                            <input type="text" class="form-control" id="direccion" value={direction} required onChange={(event) => setDirection(event.target.value)}/>
                            
                            <div class="valid-tooltip">¡Campo válido!</div>
                            <div class="invalid-tooltip">Debe completar los datos.</div>
                        </div>      
                        <div class="col-12">
                            <h6>* Campos Obligatorios</h6>
                            <button className="Button2" class="btn btn-outline-white" onClick={createOrder}>Generar Orden de Compra </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Checkout