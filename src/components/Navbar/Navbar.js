import React from 'react'
import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import ItemListContainer from '../ItemListContainer/ItemListContainer';



function Navbar() {

	return (
		<>
			<nav className='menu'>
				<h2> <span>Nuestra Tienda </span></h2>
				<CartWidget />	
				<div className='botones'>
					<button><a href="">Inicio</a></button> 
					<button><a href="">Productos</a></button> 
					<button><a href="">Nosotrtos</a></button> 
					<button><a href="">Contacto</a></button> 
				</div>							
			</nav>
		</>
	)
}	

export default Navbar



