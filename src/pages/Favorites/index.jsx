import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.css';

const Favorites = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const myList = localStorage.getItem('@primeFlix');
		setMovies(JSON.parse(myList) || []);
	}, []);

	const deleteMovie = (id) => {
		let filterMovie = movies.filter((m) => m.id !== id);

		setMovies(filterMovie);

		localStorage.setItem('@primeFlix', JSON.stringify(filterMovie));

		toast.success('Filme deletado com sucesso');
	};

	return (
		<div className='my-movies'>
			<h1>Meus Filmes Favoritos</h1>

			{movies.length === 0 && <span>Você não possui filmes salvos 🙁</span>}

			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>
						<span>{movie.title}</span>
						<div>
							<Link to={`/movie/${movie.id}`}>Ver Detalhes</Link>
							<button onClick={() => deleteMovie(movie.id)}>Exluir</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Favorites;
