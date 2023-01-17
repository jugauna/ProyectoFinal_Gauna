import { NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navigate = useNavigate()

  return (
    <nav className="NavBar" >
          <h2 onClick={() => navigate('/')}>Mi tienda</h2>
        <div className="Categories">
          <NavLink to={`/category/TV`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Televisores</NavLink>
          <NavLink to={`/category/Heladeras`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Heladeras</NavLink>
          <NavLink to={`/category/Lavarropas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Lavarropas</NavLink>
        </div>
        { <CartWidget /> }
    </nav>
  )
}
export default NavBar