import React from 'react'
import styled from 'styled-components'
import CartWidget from '../CartWidget/CartWidget'
import ItemListContainer from '../ItemListContainer/ItemListContainer';


function Navbar() {

	
	return (
		<>
			<NavContainer>
				<h2> <span>App deportiva</span></h2>
				<CartWidget />
				<ItemListContainer />				
			</NavContainer>
		</>
	)
}	

export default Navbar

const NavContainer = styled.nav`
h2{
    color: white;
    font-weight: 400;
    span{
        font-weight: bold;
    }
}
padding: .4rem;
background-color: #333;
display: flex;
align-items: center;
justify-content: space-between;
a{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
	font-size: 1.2rem;
}
`
