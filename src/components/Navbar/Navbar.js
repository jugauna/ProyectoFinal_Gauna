import { NavLink,Link} from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const NavBar = () => {

  const navigate = useNavigate()

  const { totalQuantity } = useContext(CartContext)

  return (
    <nav className="NavBar" >
          <h2 onClick={() => navigate('/')}>Tienda</h2>
        <div className="Categories">
          <NavLink to={`/category/TV`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Televisores</NavLink>
          <NavLink to={`/category/Heladeras`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Heladeras</NavLink>
          <NavLink to={`/category/Lavarropas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Lavarropas</NavLink>
        </div>
        <Link  to='/cart'><CartWidget totalQuantity={totalQuantity} /></Link>       
    </nav>
  )
}
export default NavBar