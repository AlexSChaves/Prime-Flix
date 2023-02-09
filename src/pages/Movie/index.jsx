import React from 'react';
import './styles.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Movie = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadMovie() {
			await api
				.get(`movie/${id}`, {
					params: {
						api_key: '7bccd66228dec4291aa036eae9d00ee9',
						language: 'pt-BR',
					},
				})
				.then((res) => {
					// console.log(res.data);
					setMovie(res.data);
					setLoading(false);
				})
				.catch(() => {
					console.log('Filme não encontrado');
					navigate('/', { replace: true });
				});
		}
		loadMovie();

		return () => {
			console.log('Componente desmontado');
		};
	}, [navigate, id]);

	if (loading) {
		return (
			<div className='movie-info'>
				<h1>Carregando Detalhes...</h1>
			</div>
		);
	}

	const saveMovie = () => {
		const myList = localStorage.getItem('@primeFlix');

		let savedMovies = JSON.parse(myList) || [];

		const hasMovie = savedMovies.some(
			(savedMovie) => savedMovie.id === movie.id
		);

		if (hasMovie) {
			toast.warn('Filme já está na lista');
			return;
		}

		savedMovies.push(movie);

		localStorage.setItem('@primeFlix', JSON.stringify(savedMovies));

		toast.success('FIlme Salvo com sucesso');
	};

	document.title = movie.title;

	return (
		<div className='movie-info'>
			<h1>
				{movie.title} ({movie.release_date.slice(0, 4)})
			</h1>
			<img
				src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
				alt={movie.title}
			/>
			<h3>Sinopse</h3>
			<span>{movie.overview}</span>
			<strong>Avaliação: {movie.vote_average.toFixed(2)}/10</strong>

			<div className='area-buttons'>
				<button onClick={saveMovie}>Salvar</button>

				<a
					target='blank'
					rel='external'
					href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
				>
					Trailer
				</a>
			</div>
		</div>
	);
};

export default Movie;
