import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [nextMovies, setNextMovies] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadMovies() {
			const res = await api.get('movie/now_playing', {
				params: {
					api_key: '7bccd66228dec4291aa036eae9d00ee9',
					language: 'pt-BR',
					page: 1,
				},
			});

			// console.log(res.data.results.slice(0, 10));
			setMovies(res.data.results.slice(0, 10));
			setLoading(false);
		}

		async function loadNextMovies() {
			const res = await api.get('movie/upcoming', {
				params: {
					api_key: '7bccd66228dec4291aa036eae9d00ee9',
					language: 'pt-BR',
					page: 1,
				},
			});

			// console.log(res.data.results.slice(0, 10));
			setNextMovies(res.data.results.slice(0, 10));
			setLoading(false);
		}

		loadMovies();
		loadNextMovies();
	}, []);

	if (loading) {
		return (
			<div className='loading'>
				<h2>Loading Movies...</h2>
			</div>
		);
	}

	document.title = 'Prime Flix';

	return (
		<div className='container'>
			<h1>Em Cartaz</h1>

			<div className='list-movies'>
				{movies.map((movie) => {
					return (
						<article key={movie.id}>
							<strong>{movie.title}</strong>
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
							/>
							<Link to={`/movie/${movie.id}`}>Acessar</Link>
						</article>
					);
				})}
			</div>

			<hr />

			<h1>Próximos Lançamentos</h1>
			<div className='list-movies'>
				{nextMovies.map((movie) => {
					return (
						<article key={movie.id}>
							<strong>{movie.title}</strong>
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
							/>
							<Link to={`/movie/${movie.id}`}>Acessar</Link>
						</article>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
