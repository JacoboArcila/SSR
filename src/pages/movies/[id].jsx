import React, { useState } from "react";
import Link from "next/link";
import ReactPlayer from "react-player";
import {
	Sugestions,
	PosterContainer,
	LogoRates,
	DescriptioContainer,
	RatesContainer,
	Purple,
	ContainerInfoMovie,
	Poster,
	As,
	Info,
	Contenedor,
	Puntuaciones,
	CloseButton,
	VideoModal,
} from "@styles/pages.styles/movies.styles";
import Image from "next/image";
import AddButton from "@components/addButton/AddButton";
import StarRating from "@components/stars/Estrellas";
import { useAuth } from "@/hooks/useAuth";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { Toaster, toast } from "sonner";

const InactiveStarRating = () => {
	const stars = [];

	for (let i = 1; i <= 5; i++) {
		stars.push(<FaStar key={i} style={{ color: "white", marginRight: "8px", fontSize: "28px" }} />);
	}

	return <div style={{ display: "flex" }}>{stars}</div>;
};

function MovieDetail({ movies }) {
	//verify that users are logged in
	const auth = useAuth();

	//section for manage the modal state
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleImageClick = () => {
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	//section to mange the rating stars
	const [rating, setRating] = useState(0);

	const handleStarClick = async (newRating) => {
		const API = process.env.NEXT_PUBLIC_API_URL;
		if (auth.user) {
			try {
				const userId = Cookies.get("userId");
				const endpoint = `${API}/authorization/users/${userId}/addrating`;

				const postData = {
					movieId: movies?.movieId,
					rating: newRating,
				};

				const response = await axios.post(endpoint, postData);

				setRating(newRating);

				if (response.data === "Vote added") {
					toast.success(`Película agregada a la lista`);
				} else {
					toast.success(`Su voto ha sido modificado con éxito`);
				}
			} catch (error) {
				console.error("Error en la solicitud POST:", error);
			}
		}
	};

	return (
		<main>
			<Purple></Purple>
			<Contenedor>
				<ContainerInfoMovie>
					<Info>
						<p className="genero">{movies?.genre}</p>
						<p className="anio">{movies?.releaseDate}</p>
						<p className="titulo">{movies?.title}</p>
						<span className="cast">
							Director:
							<p className="castD">{movies?.director}</p>
						</span>
						<span className="cast">
							Musica:
							<p className="castD">{movies?.composer}</p>
						</span>
						<span className="cast">
							Elenco:
							<p className="castD">{movies?.actors}</p>
						</span>
						<span className="platforms">
							Disponible en:
							<div className="imagenPlatform">
								<Image className="logo" src="/images/home/logos/disney.svg" alt="" width={100} height={100} />
							</div>
						</span>
					</Info>
					<As>
						<PosterContainer>
							<Poster src={movies?.image_url} onClick={handleImageClick} />
							<AddButton movie={movies?.movieId} />
							{/* <Poster src={movies?.image_url} onClick={handleImageClick} /> */}
						</PosterContainer>
						<RatesContainer>
							<LogoRates src="/images/home/A.png" alt="Profile" />
						</RatesContainer>
						<div className="container">
							{auth.user ? (
								<StarRating rating={rating} onStarClick={handleStarClick} />
							) : (
								<div>
									<InactiveStarRating />
									<Link href="/signIn" className="link_text">
										Inicia sesión para calificar
									</Link>
								</div>
							)}
						</div>
					</As>
				</ContainerInfoMovie>
				<DescriptioContainer>
					<Puntuaciones className="puntuacion">
						<p className="numerosPorcentaje div3">{movies.rt_score}</p>
						<p className="numerosPorcentaje div4">{movies.imdb_score}</p>
						<p className="numerosPorcentaje div5">{movies.mc_score}</p>
						{movies.score ? <p className="numerosPorcentaje div9">{movies.score.toFixed(1)}</p> : ""}
						{movies.score ? (
							<Image
								src="/images/EcranLogo.png"
								alt="imagen1"
								width={80}
								height={50}
								style={{ marginTop: "-15px" }}
								className="div10"
							/>
						) : (
							""
						)}
						<Image src="/images/Group.svg" alt="imagen1" width={50} height={50} className="div6" />
						<Image src="/images/Metacritic1.png" alt="imagen1" width={50} height={50} className="div7" />
						<Image src="/images/RottenTomatoes.png" alt="imagen1" width={80} height={50} className="div8" />
					</Puntuaciones>
					<p className="day_p">{movies.review}</p>
				</DescriptioContainer>
				<Sugestions>
					<h4 className="oldies_title">Sugerencias</h4>
					{/* <div className="suggestions_cards">
						{cardMovies.slice(0, 3).map((item) => (
							<div className="card" key={item.id}>
								{" "}
								<Card movie={item} />
							</div>
						))}
					</div> */}
				</Sugestions>
				<VideoModal
					isOpen={isModalOpen}
					onRequestClose={handleCloseModal}
					overlayClassName="ReactModal__Overlay custom-overlay"
					ariaHideApp={false}
				>
					<ReactPlayer url={movies?.trailer_url} playing controls width="100%" height="100%" />
					<CloseButton onClick={handleCloseModal}>Cerrar</CloseButton>
				</VideoModal>
			</Contenedor>
			<Toaster richColors position="bottom-right" />
		</main>
	);
}

export async function getServerSideProps(contexto) {
	const { id } = contexto.params;
	const movies = await getMovie(id);
	return {
		props: {
			movies,
		},
	};
}

export default MovieDetail;
