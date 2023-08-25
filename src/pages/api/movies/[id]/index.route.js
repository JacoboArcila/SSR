import { getMovie } from "@/services/movies/movie.service";
import { ERROR_SERVER } from "@/services/movies/movie.error";

export default async function handler(req, res) {
	const { id } = req.query;
	res.setHeader("Content-Type", "application/json");
	const idNumber = parseInt(`${id}`);

	try {
		const result = await getMovie(idNumber);
		res.status(200).json(result);
		return;
	} catch (err) {
		console.log(err);
		res.status(500).json(ERROR_SERVER);
	}
}
