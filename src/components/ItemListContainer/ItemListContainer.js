import './ItemListContainer.css'
import { useState, useEffect } from 'react'
import { getProducts, getProductsByCategory} from "../../asyncMock"
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams() 

    useEffect(() => {
        document.title = 'Todos los productos'
    }, [])

    useEffect(() => {
        setLoading(true)
        
        const asyncFunction = categoryId ? getProductsByCategory : getProducts

        asyncFunction(categoryId).then(response => {
            setProducts(response)
        }).catch(error => {           
        }).finally(() => {
            setLoading(false)
        })          
    }, [categoryId])


    if(loading) {
        return <h1>Cargando Electrodomésticos...</h1>
    }

    return (
        <div className='ItemListContainer'>
            <h1>{greeting}</h1>
            <ItemList products={products} />
        </div>
    )
}

export default ItemListContainer