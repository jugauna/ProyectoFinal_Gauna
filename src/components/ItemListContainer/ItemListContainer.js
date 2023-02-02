import './ItemListContainer.css'
//import { useState, useEffect } from 'react'
/* import { getProducts, getProductsByCategory} from "../../asyncMock" */
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
//import { getDocs, collection, query, where } from 'firebase/firestore'
//import { db } from '../../services/firebase/firebaseConfig'

import { useAsync } from '../../hooks/useAsync'
import { useTitle } from '../../hooks/useTitle'
import { getProducts } from '../../services/firebase/firestore/products'

const ItemListContainer = ({ greeting }) => {
    useTitle('Todos los productos', [])

    const { categoryId } = useParams()

    const getProductsWithCategory = () => getProducts(categoryId)

    const { data: products, error, loading } = useAsync(getProductsWithCategory, [categoryId])



/*     const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams() 

    useEffect(() => {
        document.title = 'Todos los productos'
    }, [])

    useEffect(() => {
        setLoading(true)

        const collectionRef = categoryId
        ? query(collection(db, 'products'), where('category', '==', categoryId))
        : collection(db, 'products')
        
        getDocs(collectionRef).then(response => {
            
            const productsAdapted = response.docs.map(doc => {
                const data = doc.data ()
                

                return { id:doc.id, ...data}    

            })
            
            setProducts(productsAdapted)             
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        }) */



        /* const asyncFunction = categoryId ? getProductsByCategory : getProducts

        asyncFunction(categoryId).then(response => {
            setProducts(response)
        }).catch(error => {           
        }).finally(() => {
            setLoading(false)
        })           
    }, [categoryId])*/


    if(loading) {
        return <h1>Cargando Electrodomésticos...</h1>
    }

    
    if(error) {
        return <h1>Hubo un error cargando los productos</h1>
    }
    return (
        <div className='ItemListContainer'>
            <h1>{greeting}</h1>
            <ItemList products={products} />
        </div>
    )
}

export default ItemListContainer