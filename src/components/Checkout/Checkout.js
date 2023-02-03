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
    const {cart, total, clearCart } = useContext(CartContext)//total es totalpay y clearCert es clearAll

    const navigate = useNavigate()

    const createOrder = async () => {
        setLoading(true)
        try {
            const objOrder = {//newOrder
                buyer: {
                    /* name: 'Juan Gauna',
                    phone: '9876543210',
                    email: 'info@jugauna.com' */
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
            console.log(ids)
    
            const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
    
            // getDocs(productsRef).then(productsAddedToCartFromFirestore => {
    
            // })
    
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
        /* <div>
            <h1>Finalizar Compra</h1>
            <button onClick={createOrder}>Generar Orden de Compra</button>
        </div> */
        /* <div className='cart-container'>
            <div>
                <div>
                    <div>
                        <h1>Ingrese sus datos de Contacto</h1>
                    </div>
                    <div class="formulario"> */
                    /*     <form class="form-horizontal">
                            <div class="col-md-8">
                                <label for="inputNombre" class="col-lg-8 control-label">Nombre y Apellido</label>
                                <input type="text" value={name} class="form-control" placeholder="Nombre y Apellido" aria-label="nombre" onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div class="col-md-8">
                                <label for="inputNombre" class="form-label">Telefono</label>
                                <input type="text" value={phone} class="form-control" placeholder="Telefono" aria-label="nombre" onChange={(event) => setPhone(event.target.value)}/>
                            </div>
                            <div class="col-md-8">
                                <label for="inputEmail4" value={email} class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="Email" id="inputEmail4" onChange={(event) => setEmail(event.target.value)}/>
                            </div>
                            <div class="col-md-8">
                                <label for="inputComentarios" class="form-label">Dirección</label>
                                
                                <input type="text" value={direction} class="form-control" placeholder="Dirección" aria-label="Direccion" onChange={(event) => setDirection(event.target.value)}/>
                            </div>
                            <div class="col-12 boton">
                                
                                <button className="Button2" class="btn btn-outline-primary" onClick={createOrder}>Generar Orden de Compra </button>
                            </div> 
                        </form> */
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
                         {/* <div class="col-md-3 position-relative">
                            <label for="pais" class="form-label">País</label>
                            <select class="form-select" id="pais" required>
                                <option selected disabled value="">Seleccione...</option>
                                <option>México</option>
                                <option>Colombia</option>
                                <option>Perú</option>
                                <option>Chile</option>
                                <option>Argentina</option>
                            </select>
                            
                            <div class="valid-tooltip">¡Campo válido!</div>
                            <div class="invalid-tooltip">Debe completar los datos.</div>
                        </div>  */}    

                                      
                        <div class="col-12">
                            <h6>* Campos Obligatorios</h6>
                            <button className="Button2" class="btn btn-outline-white" onClick={createOrder}>Generar Orden de Compra </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>



                    /* <form  >
                        <div>
                            <input type="text" value={name} placeholder="Nombre y Apellido" onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div>
                            <input type="text" value={phone} placeholder="Telefono" onChange={(event) => setPhone(event.target.value)}/>
                        </div>
                        <div>
                            <input type="email" value={email} placeholder="Correo electronico" onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                        <div>
                            <input type="text" value={direction} placeholder="Direccion" onChange={(event) => setDirection(event.target.value)}/>
                        </div>
                    </form> */
             /*    </div>
            </div>             
        </div>
        </div> */

    )
}




export default Checkout