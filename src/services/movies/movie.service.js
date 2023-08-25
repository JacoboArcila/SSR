export const getMovies = async () => {
	const response = await fetch("https://83n5sz9zvl.execute-api.us-east-1.amazonaws.com/api/v1/movies");
	return await response.json();
};

export const getMovie = async (id) => {
	const response = await fetch(`https://83n5sz9zvl.execute-api.us-east-1.amazonaws.com/api/v1/movies/${id}`);
	return await response.json();
};
