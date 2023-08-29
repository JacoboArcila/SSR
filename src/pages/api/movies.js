export async function fetchMovies() {
	try {
		const response = await fetch("https://83n5sz9zvl.execute-api.us-east-1.amazonaws.com/api/v1/movies");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching movies data:", error);
		throw error;
	}
}
