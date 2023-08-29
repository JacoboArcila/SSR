import Carousel from "@/components/carousel/Carousel";
import React from "react";
import { fetchMovies } from "./api/movies";

export default function Home({ response }) {
	return (
		<>
			<Carousel movies={response} top={false} />
		</>
	);
}

export async function getServerSideProps() {
	const response = await fetchMovies();
	return {
		props: {
			response,
		},
	};
}
