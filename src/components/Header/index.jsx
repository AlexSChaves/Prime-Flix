import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
	return (
		<header>
			<Link className='logo' to='/'>
				Prime Flix
			</Link>
			<Link className='favorites' to='/favorites'>
				Meus Filmes
			</Link>
		</header>
	);
};

export default Header;
